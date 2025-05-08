import React, { useEffect, useState, useRef } from "react";
import apiClient from "../../lib/apiService";
import { Pencil, Trash2 } from "lucide-react";
import DeleteConfirmModal from "../ui/DeleteConfirmModal";
import Table from "../Table";
import AddCatagoryPopup from "./AddCatagoryPopup";


const columns = [
  { label: "Name", field: "name" },
  { label: "Description", field: "description" },
  { label: "Actions", field: "actions" }
];

const CatagoryList = () => {

  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [catagories, setCatagories] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    rowsNumber: 0,
    sortKey: null,
    isDesc: false,
    loading: false
  })

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const searchTimer = useRef(null);
  const selectedCatagory = useRef(null);

  useEffect(() => {
    fetchCatagories();
  }, []);

  const updateCatagory = (row) => {
    selectedCatagory.current = row;
    setAddPopup(true);
  }

  const fetchCatagories = async (filter = {}) => {
    try {
      setPagination(prev => ({
        ...prev,
        loading: true
      }));


      const query = generateQuery(filter);
      const res = await apiClient.get(`/api/v1/categories${query}`);
      setPagination((prev) => {
        return {
          ...prev,
          rowsNumber: res.data.totalCount,
          loading: false
        }
      });
      const data = res.data.contents || [];

      const catagoryData = data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description
        }
      })

      setCatagories(catagoryData || []);
    } catch (error) {
      setPagination(prev => ({
        ...prev,
        loading: false
      }));
      console.error(error);
    }
  };

  const generateQuery = (filters) => {
    const page = filters.page || 1;
    const limit = filters.pageSize || 10;
    const search = filters.search || "";
    const sortKey = filters.sortKey || "createdAt";
    const isDesc = filters.isDesc || false;


    let query = `?page=${page}&limit=${limit}&orderBy=${isDesc ? "-" : ""}${sortKey}`;
    if (search) {
      query += `&search=${encodeURIComponent(search)}`;
    }
    return query;
  };


  const handleDelete = (item) => {
    setShowDeleteModel(true);
    selectedCatagory.current = item
  };

  const deleteCatagory = async () => {
    try {
      setDeleteLoading(true);
      await apiClient.delete(`/api/v1/categories/${selectedCatagory.current.id}`)
      fetchCatagories()
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
    fetchCatagories(data);
  };

  const handleSearchCatagories = (e) => {
    const query = e.target.value;
    const filter = {
      ...catagories,
      page: 1,
      search: query
    }
    setPagination(filter)

    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    searchTimer.current = setTimeout(() => {
      fetchCatagories(filter);
    }, 500);
  };

  const topHeader = () => {
    return (
      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <input
          type="search"
          className="w-full text-sm sm:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1"
          placeholder="Search product"
          onChange={handleSearchCatagories}
        />
      </div>
    );
  };


  const renderActions = (row) => {
    return (
      <div className="flex gap-4">
        <button  className="text-secondary hover:text-blue-700" onClick={() => updateCatagory(row)}>
          <Pencil size={17} />
        </button>
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
        <h1 className="title">Catagories</h1>
        <div className="flex gap-4">
          <button className="primary-btn-sm" onClick={() => updateCatagory(null)}>Add Catagory </button>
        </div>
      </div>
        <div className="product-list-table">
          <Table
            columns={columns}
            rows={catagories}
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

      <DeleteConfirmModal
        open={showDeleteModel}
        onClose={() => setShowDeleteModel(false)}
        onConfirm={deleteCatagory}
        loading={deleteLoading}
      />
      <AddCatagoryPopup
        open={addPopup}
        data={selectedCatagory.current}
        onClose={() => {
          setAddPopup(false);
          fetchCatagories();
        }}
      />
    </div>
  );
};

export default CatagoryList;
