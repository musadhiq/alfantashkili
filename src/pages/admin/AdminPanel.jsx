import React, { useState } from "react";
import { Car, FolderOpen, Plus, TableProperties, Trash2 } from "lucide-react";
import ProductList from "../../components/ProductList";
import CatagoryList from "../../components/catagory/CatagoryList";

const AdminPanel = () => {
    const [tab, setTab] = useState("products");

    const [categories, setCategories] = useState(["Engine", "Wheels"]);
    const [brands, setBrands] = useState(["Toyota", "BMW"]);

    const [input, setInput] = useState("");
    const isCategory = tab === "categories";

    const handleAdd = () => {
        if (!input.trim()) return;
        isCategory
            ? setCategories([...categories, input])
            : setBrands([...brands, input]);
        setInput("");
    };

    const handleDelete = (index) => {
        isCategory
            ? setCategories(categories.filter((_, i) => i !== index))
            : setBrands(brands.filter((_, i) => i !== index));
    };

    return (
        <div className="p-6 max-w-[1400px] mx-auto">
            <div className="flex gap-3 pb-6 border-b">
                <button
                    className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm ${tab === "products" && "bg-black text-white"}`}
                    onClick={() => setTab("products")}
                >
                    <TableProperties /> Products
                </button>
                <button
                    className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm ${tab === "categories" && "bg-black text-white"}`}
                    onClick={() => setTab("categories")}
                >
                    <FolderOpen /> Categories
                </button>
                {/* <button
                    className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm ${tab === "brands" && "bg-black text-white"}`}
                    onClick={() => setTab("brands")}
                >
                    <Car /> Vehicle Brands
                </button> */}
            </div>

            {/* Products List */}
            {tab === "products" && (
                <ProductList />
            )}

            {tab === "categories" && (
                <CatagoryList />
            )}
        </div>
    );
};

export default AdminPanel;
