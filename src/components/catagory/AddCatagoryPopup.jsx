import  { useEffect, useState } from "react";
import apiClient from "../../lib/apiService";

const AddCategoryPopup = ({ open,data , onClose }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [catId, setCatId] = useState(null);
    const [loading, setLoading] = useState(false);
    
    
    useEffect(() => {
        if (data) {
            setCatId(data.id);
            setName(data.name || "");
            setDescription(data.description || "");
        } else {
            setName("");
            setDescription("");
        }
    }, [data]);
    
    if (!open) return null;
    const handleAdd = async () => {
        if (!name.trim()) {
            alert("Category name is required.");
            return;
        }
    
        setLoading(true);
    
        try {
            const payload = { name, description };
            const method = catId ? "put" : "post";
            const url = catId
                ? `/api/v1/categories/${catId}`
                : "/api/v1/categories";
    
            const result = await apiClient[method](url, payload);
    
            if (result?.status === 200) {
                setName("");
                setDescription("");
                onClose();
            }
        } catch (error) {
            console.error("Error saving category:", error);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Add New Category</h2>

                <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-1">Category Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-3 py-2 rounded text-sm"
                        placeholder="e.g., Suspension"
                        disabled={loading}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border px-3 py-2 rounded text-sm"
                        placeholder="Optional description"
                        rows={3}
                        disabled={loading}
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleAdd}
                        className="px-4 py-2 text-sm text-white bg-black rounded hover:bg-gray-800 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Save"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCategoryPopup;
