import React, { useState, useEffect } from 'react'
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import ImageUploader from '../../components/ui/ImageUploader';
import MultiImageUploader from '../../components/ui/MultiImageUploader';
import Breadcrumb from '../../components/Breadcrumb';
import apiClient from "../../lib/apiService";
import { useParams, useNavigate } from 'react-router-dom';
import LoaderModal from "../../components/ui/LoaderModel"
import { Trash2 } from 'lucide-react';
import DeleteConfirmModal from '../../components/ui/DeleteConfirmModal';
import CreateSelector from '../../components/createSelector';
import alertService from '../../services/alertService';

const breadcrumbItems = [
    { label: 'Home', href: '/admin/dashboard' },
    { label: 'Add Product' },
];

const api = {
    category: `/api/v1/categories`,
    brand: `/api/v1/brands`,
}

function addProduct() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: '',
        description: '',
        categoryName: '',
        brandName: '',
        model: '',
        variant: '',
        year: null,
        stock: '',
        unit: '',
        price: '',
        contactInfo: '',
        metadata: {}
    });

    const [loading, setLoading] = useState(false);
    const [preLoaderMessage, setPreloaderMessage] = useState("Loading Please wait...");

    const [images, setImages] = useState({
        coverImage: null,
        galleryImages: []
    });

    const [showImageDeleteModel, setShowImageDeleteModel] = useState(false);
    const [productImages, setProductImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const editMode = Boolean(id);

    useEffect(() => {
        if (editMode) {
            fetchProductById(id);
        }
    }, [id]);

    const fetchProductById = async (productId) => {
        try {
            const response = await apiClient.get(`/api/v1/products/${productId}`);
            const productData = response.data;

            
            // Destructure images from the response
            const { images: fetchedImages = [], ...rest } = productData;
            
            setProduct({
                brandName: rest.brand.name,
                categoryName: rest.category.name,
                contactInfo: rest.contactInfo,
                description: rest.description,
                metadata: rest.metadata,
                model: rest.model,
                variant: rest.variant,
                year: rest.year,
                price: rest.price,
                stock: rest.stock,
                title: rest.title, 
                unit: rest.unit,
            });

            setProductImages(fetchedImages)
        } catch (error) {
            console.error('Failed to fetch product:', error);
        }
    };



    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleFileUpload = (name, value) => {
        setImages((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (editMode) {
            await updateProduct(product);
        } else {
            await submitProduct(product);
        }
        setLoading(false);
    };

    const submitProduct = async (formData) => {
        setPreloaderMessage("Creating Product Please wait...");
        try {
            const response = await apiClient.post('/api/v1/products', formData);
            if (response.status === 200) {
                await uploadProductImages(response.data.id);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateProduct = async (formData) => {
        setPreloaderMessage("Updating Product Please wait...");
        try {
            const response = await apiClient.put(`/api/v1/products/${id}`, formData);
            if (response.status === 200) {
                await uploadProductImages(response.data.id);
            }else{
                alertService.error("Product Update Failed");
            }
        } catch (error) {
            alertService.error("Product Update Failed");
            console.error(error);
        }
    };

    const uploadProductImages = async (productId) => {
        setPreloaderMessage("Uploading Product Images Please wait...");
        try {
            if (!images.coverImage && !images.galleryImages.length) {
                alertService.success("Product uploaded successfully");
                return clearForm();
            }
            const formData = new FormData();
            formData.append('coverImage', images.coverImage);
            images.galleryImages.forEach((image) => {
                formData.append('galleryImages', image);
            });
            const response = await apiClient.post(`/api/v1/products/${productId}/images`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            if (response.status === 200) {
                alertService.success("Product uploaded successfully");
                clearForm();
            }
        } catch (error) {
            alertService.error("Failed to upload product images");
            console.error(error);
        }
    };

    const clearForm = () => {
        setProduct({
            title: '',
            description: '',
            categoryName: '',
            brandName: '',
            model: '',
            variant: '',
            year: null,
            stock: '',
            unit: '',
            price: '',
            contactInfo: '',
            metadata: {}
        });
        setImages({
            coverImage: null,
            galleryImages: []
        });
        return navigate("/admin/dashboard");
    };

    const handleDeleteImage = (e, imageId) => {
        e.preventDefault()
        setSelectedImage(imageId);
        setShowImageDeleteModel(true);
    }

    const deleteImage = async () => {
        try {
            setDeleteLoading(true);
            const response = await apiClient.delete(`/api/v1/products/images/${selectedImage}`)
            if (response.status === 200) {
                fetchProductById(id);
            }
        } catch (error) {
            console.error(error)
        } finally {
            setDeleteLoading(false);
            setShowImageDeleteModel(false);
        }
    }

    return (
        <>
            <div className="wrapper">
                <Breadcrumb items={breadcrumbItems} />

                <div className="landing-page">
                    <div className="add-product-form">
                        <h1 className="main-title-sm">Add Product</h1>
                    </div>
                        <div className="card p-sm">
                            <h1 className="sub-title-md mb-md">
                                Basic Information
                            </h1>
                            <div className="form-wrapper">
                                <Input required label="Product Title" name={'title'} value={product.title} onChange={handleChange} />
                                <CreateSelector label="Catagory" name={'categoryName'} onChange={handleChange} value={product.categoryName} api={api.category} />
                            </div>
                            <div className="mt-md mb-lg">
                                <Textarea label="Description" name={'description'} value={product.description} onChange={handleChange} />
                            </div>
                            <div className="form-wrapper mb-lg">
                                <CreateSelector label="Brand" name={'brandName'} onChange={handleChange} value={product.brandName} api={api.brand} />
                                <Input required label="Model" name={'model'} value={product.model} onChange={handleChange} />
                                <Input   label="Variant" name={'variant'} value={product.variant} onChange={handleChange} />
                                <Input type='number' label="Year" name={'year'} value={product.year} onChange={handleChange} />
                            </div>
                            <div>
                                <Input label="Contact Information" name={'contactInfo'} value={product.contactInfo} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="card p-sm mt-lg">
                            <h1 className="sub-title-md mb-md">
                                Pricing & Inventory
                            </h1>
                            <div className="form-wrapper">
                                <Input label="Stock Quantity" name={'stock'} value={product.stock} onChange={handleChange} />
                                <Input label="Unit Type" name={'unit'} value={product.unit} onChange={handleChange} />
                            </div>
                            <div className=" mb-lg">
                                <Input label="Price" name={'price'} value={product.price} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="card p-sm mt-lg" >
                            <h1 className="sub-title-md mb-md">
                                Media
                            </h1>
                            {
                                productImages && productImages.filter((image) => image.type === 'COVER').length === 0 && (
                                    <div className="mt-md mb-lg">
                                        <ImageUploader label="Product Cover Image" name={'coverImage'} value={images.coverImage} onChange={handleFileUpload} />
                                    </div>
                                )
                            }
                            {editMode && productImages.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                    {productImages.map((image, index) => (
                                        <div key={index} className="relative border rounded p-2 bg-white shadow-sm">
                                            <img
                                                src={image.url}
                                                alt={`Product ${index}`}
                                                className="w-full h-40 object-cover rounded"
                                            />

                                            {/* Label */}
                                            <span className="absolute top-2 left-2 bg-secondary text-white text-xs px-2 py-0.5 rounded-s-none rounded-sm">
                                                {image.type === 'COVER' ? 'Cover Image' : 'Gallery'}
                                            </span>

                                            {/* Delete Button */}
                                            <button
                                                onClick={(e) => handleDeleteImage(e, image.id)}
                                                className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-md w-6 h-6 text-xs flex items-center justify-center"
                                                title="Delete image"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="mt-md mb-lg">
                                <MultiImageUploader label="Product Images" name={'galleryImages'} value={images.galleryImages} onChange={handleFileUpload} />
                            </div>


                        </div>
                        <div className="add-product-actions py-md">
                            <button className="btn secondary-btn">Cancel</button>
                            <button className="btn primary-btn-md" onClick={handleSubmit}>Save</button>
                        </div>
                </div>
            </div>
            <LoaderModal show={loading} message={preLoaderMessage} />
            <DeleteConfirmModal
                open={showImageDeleteModel}
                onClose={() => setShowImageDeleteModel(false)}
                onConfirm={deleteImage}
                loading={deleteLoading}
            />
        </>
    )
}

export default addProduct