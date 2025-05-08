import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import CategoryFilter from '../../components/utilities/CategoryFilter';
import { Link } from 'react-router-dom';
import AdvancedSearchFilter from '../../components/AdvancedSearchFilter';
import apiClient from "../../lib/apiService"
import { useSelector } from 'react-redux';
import LinearLoader from '../../components/ui/LinearLoader';
import Pagination from "../../components/ui/Pagination";
import ProductFallBack from '../../components/ProductsFallback';

function Store() {
    const [products, setProducts] = useState([]);

    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 8,
        rowsNumber: 0
    })

    const [loading, setLoading] = useState(false);

    const { category, brand, model, priceRange, search, year, variant } = useSelector((state) => state.filters);
    const fetchProducts = async (filters = pagination) => {
        try {
            setLoading(true);
            const query = generateQuery(filters);
            const response = await apiClient.get(`/api/v1/products${query}`);
            const data = response.data.contents || [];

            setProducts(data);
            setPagination((prev) => {
                return {
                    ...prev,
                    rowsNumber: response.data.totalCount,
                }
            });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    const [totalPages, setTotalPages] = useState(Math.ceil(pagination.rowsNumber / pagination.pageSize));

    useEffect(() => {
        fetchProducts()
    }, [category, brand, model, search, variant, year])

    useEffect(() => {
        setTotalPages(Math.ceil(pagination.rowsNumber / pagination.pageSize))
    }, [pagination.rowsNumber, pagination.pageSize])

    const generateQuery = (filters) => {
        const page = filters.page || 1;
        const limit = filters.pageSize || 10;

        let query = `?page=${page}&limit=${limit}`;

        if (category) query += `&category=${category}`;
        if (brand) query += `&brand=${brand}`;
        if (model) query += `&model=${model}`;
        if (variant) query += `&variant=${variant}`;
        if (year) query += `&year=${year}`
        if (search) query += `&searchText=${search}`
        return query
    }

    const handlePagination = (newPage) => {
        setPagination(
            (prev) => {
                return {
                    ...prev,
                    ...newPage
                }
            }
        );
        fetchProducts(newPage);
    };

    return (
        <section className="w-full bg-white pt-4">
            <div className="max-w-[1440px] mx-auto px-4">
                <h1 className="text-xl font-semibold mb-4">Explore our store</h1>

                <CategoryFilter type="tab" />

                <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-6 mt-4">
                    <AdvancedSearchFilter withClearButton={true}/>


                    {/* Products Grid */}
                    <div>
                        {loading && <div className="my-2">
                            <LinearLoader />
                        </div>}
                        {products.length > 0 ?
                            (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        actions={
                                            <Link to={`/product/${product.id}`} className="text-sm text-blue-600 hover:underline">
                                                View
                                            </Link>
                                        }
                                    />
                                ))}
                            </div>) : (
                                <ProductFallBack/>
                            )}
                        <Pagination
                            pagination={pagination}
                            totalPages={totalPages}
                            handlePagination={handlePagination}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Store;
