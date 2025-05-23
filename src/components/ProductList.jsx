import React, { useEffect, useState, useRef } from "react";
import Table from "./Table";
import "../styles/pages/productList.scss";
import { Link } from "react-router-dom";
import apiClient from "../lib/apiService";
import { Star, Pencil, Trash2, TableProperties } from "lucide-react";
import DeleteConfirmModal from "./ui/DeleteConfirmModal";
import ProductCard from "./ProductCard";
import Pagination from "./ui/Pagination";
import SetFeaturedModal from "./products/SetFeaturedModal";


const columns = [
  { label: "Product Name", field: "title" },
  { label: "Catagory", field: "category" },
  { label: "Description", field: "description" },
  { label: "Vehicle", field: "vehicle" },
  { label: "Stock", field: "stock" },
  { label: "Price", field: "price" },
  { label: "Actions", field: "actions" },
];

const StarFill = ({ size = 18, color = "currentColor", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.401 8.175L12 18.896l-7.335 3.871 1.401-8.175L.132 9.21l8.2-1.192L12 .587z" />
  </svg>
);

const ProductList = () => {

  const [currentView, setCurrentView] = useState("list");
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [products, setProducts] = useState([]);
  const [showFeaturedModal, setShowFeaturedModal] = useState(false);
  const [featuredLoading, setFeaturedLoading] = useState(false);
  const featuredProduct = useRef(null);

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    rowsNumber: 0,
    sortKey: null,
    isDesc: false,
    loading: false
  })

  const [deleteLoading, setDeleteLoading] = useState(false);
  const searchTimer = useRef(null);
  const selectedProduct = useRef(null);
  const totalPages = Math.ceil(pagination.rowsNumber / pagination.pageSize);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (filter = {}) => {
    try {
      setPagination(prev => ({
        ...prev,
        loading: true
      }));


      const query = generateQuery(filter);
      const res = await apiClient.get(`/api/v1/products${query}`);
      setPagination((prev) => {
        return {
          ...prev,
          rowsNumber: res.data.totalCount,
          loading: false
        }
      });
      const data = res.data.contents || [];

      const productData = data.map((item) => {
        const brand = item.brand?.name || "";
        const vehicle = `${brand} ${item.model || ""} ${item.variant || ""} ${item.year || ""}`
        return {
          id: item.id,
          title: item.title?.en,
          category: item.category?.name || "No Category",
          description: item.description?.en,
          stock: `${item.stock} ${item.unit}`,
          price: item.price,
          vehicle,
          featured: item.featured,
          tag: item.tag
        }
      })

      setProducts(productData || []);
    } catch (error) {
      setPagination(prev => ({
        ...prev,
        loading: false
      }));
      console.error(error);
    }
  };

  const handleSetFeatured = (item) => {
    setShowFeaturedModal(true);
    featuredProduct.current = item;
  };

  const generateQuery = (filters) => {
    const page = filters.page || 1;
    const limit = filters.pageSize || 10;
    const searchText = filters.searchText || "";
    const sortKey = filters.sortKey || "createdAt";
    const isDesc = filters.isDesc || false;


    let query = `?page=${page}&limit=${limit}&orderBy=${isDesc ? "-" : ""}${sortKey}`;
    if (searchText) {
      query += `&searchText=${encodeURIComponent(searchText)}`;
    }
    return query;
  };

  const updateFeaturedProduct = async (data) => {
    try {
      setFeaturedLoading(true);
      await apiClient.patch(`/api/v1/products/${data.id}`, {
        featured: data.featured,
        tag: data.tag,
      });
      setShowFeaturedModal(false);
      fetchProducts(); // refresh the list
    } catch (error) {
      console.error(error);
    } finally {
      setFeaturedLoading(false);
    }
  };


  const handleDelete = (item) => {
    setShowDeleteModel(true);
    selectedProduct.current = item
  };

  const deleteProduct = async () => {
    try {
      setDeleteLoading(true);
      await apiClient.delete(`/api/v1/products/${selectedProduct.current.id}`)
      fetchProducts()
      setShowDeleteModel(false);
      setDeleteLoading(false);
    } catch (error) {
      console.error(error)
    }
  }

  const handlePagination = (data) => {
    setPagination(
      (prev) => {
        return {
          ...prev,
          ...data
        }
      }
    );
    fetchProducts(data);
  };

  const handleSearchProducts = (e) => {
    const query = e.target.value;
    const filter = {
      ...products,
      page: 1,
      searchText: query
    }
    setPagination(filter)

    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    searchTimer.current = setTimeout(() => {
      fetchProducts(filter);
    }, 500);
  };

  const topHeader = () => {
    return (
      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <input
          type="search"
          className="w-full text-sm sm:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1"
          placeholder="Search product"
          onChange={handleSearchProducts}
        />

        <div className="flex gap-2">
          <button className={`px-4 py-2 text-sm font-medium ${currentView === "list" ? "bg-secondary text-white" : "bg-gray-200"} text-gray-800 rounded hover:opacity-80`}
            onClick={() => setCurrentView("list")}
          >
            <TableProperties size={17} />
          </button>
          {/* <button className={`px-4 py-2 text-sm font-medium ${currentView === "grid" ? "bg-secondary text-white" : "bg-gray-200"} text-gray-800 rounded hover:opacity-80`}
            onClick={() => setCurrentView("grid")}
          >
            <LayoutGrid size={17} />
          </button> */}
        </div>
      </div>
    );
  };


  const renderActions = (row) => {
    console.log(row)
    return (
      <div className="flex gap-4">
        {row.tag && <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {row.tag}
        </span>}
        <button
          onClick={() => handleSetFeatured(row)}
          className="text-yellow-500 hover:text-yellow-600"
        >
          {row.featured ? <StarFill size={17} /> : <Star size={17} />}
        </button>
        <Link to={`/admin/edit-product/${row.id}`} className="text-secondary hover:text-blue-700">
          <Pencil size={17} />
        </Link>
        <button
          onClick={() => handleDelete(row)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={17} />
        </button>
      </div>
    );
  };



  return (
    <div className="product-list">
      <div className="header">
        <h1 className="title">Products</h1>
        <div className="flex gap-4">
          <Link to="/admin/add-product" className="primary-btn-sm">Add Product</Link>
          {/* <button className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            <Funnel size={17} />
          </button> */}
        </div>
      </div>
      {currentView === "list" ? (
        <div className="product-list-table">
          <Table
            columns={columns}
            rows={products}
            topContent={topHeader()}
            pagination={pagination}
            handlePagination={handlePagination}
            cellRenderer={(row, col) => {
              if (col.field === "actions") {
                return renderActions(row);
              } else if (col.field === "description") {
                return (
                  <span className="block break-words">
                    {row.description}
                  </span>
                );
              }
              return row[col.field];
            }}
          />
        </div>
      ) : (
        <div className="product-list-grid card">
          {topHeader()}

          <div className="grid gap-4 py-4 px-4 
              grid-cols-1 
              sm:grid-cols-2 
              lg:grid-cols-3 
              xl:grid-cols-3"
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={handleDelete}
                actions={[renderActions(product)]}
              />
            ))}
          </div>


          <Pagination
            pagination={pagination}
            totalPages={totalPages}
            handlePagination={handlePagination}
          />
        </div>
      )}

      <DeleteConfirmModal
        open={showDeleteModel}
        onClose={() => setShowDeleteModel(false)}
        onConfirm={deleteProduct}
        loading={deleteLoading}
      />

      <SetFeaturedModal
        open={showFeaturedModal}
        onClose={() => setShowFeaturedModal(false)}
        onSave={updateFeaturedProduct}
        loading={featuredLoading}
        product={featuredProduct.current}
      />
    </div>
  );
};

export default ProductList;
