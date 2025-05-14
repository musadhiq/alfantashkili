

import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import Modal from "../ui/Modal";

const SetFeaturedModal = ({ open, onClose, onSave, loading, product }) => {
  const [tag, setTag] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    if (product) {
      setTag(product.tag || "");
      setIsFeatured(product.featured || false);
    }
  }, [product]);

  const handleSave = () => {
    onSave({
      id: product.id,
      featured: isFeatured,
      tag,
    });
  };

  return (
    <Modal open={open} onClose={onClose} title="Set Featured Product">
      <div className="space-y-4">
        <label className="block">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="mr-2"
          />
          Mark as Featured
        </label>

        <input
          type="text"
          placeholder="Enter Tag (e.g., Bestseller 🔥)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />

        <div className="flex justify-end gap-2 pt-4">
          <button
            className="px-4 py-2 text-sm bg-gray-200 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm bg-black text-white rounded"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin" size={16} /> : "Save"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SetFeaturedModal;
