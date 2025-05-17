import  { useState, useEffect } from "react";
import {
    Tag,
    Layers,
    Box,
    DollarSign,
    Car,
    Phone,
    MessageCircle,
} from "lucide-react";
import { sendEmail } from "../services/emailService";
import Image from './ui/Image';

const ProductDetailModal = ({ open, onClose, product }) => {
    if (!open || !product) return null;

    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
    const whatsappMessage = `I%20am%20interested%20in%20the%20product%20${product.title}%20and%20would%20like%20to%20Enquire.`;

    const cdnUrl = import.meta.env.VITE_CDN_HOST || "";

    const coverImage = product.images?.find((image) => image.type === 'COVER');
    const Images = product.images?.filter((image) => image.type !== 'COVER')?.map((image) => image.StorageType === 'CLOUD' ? `${cdnUrl}${image.path}` : image.url)

    const [imageUrl, setImageUrl] = useState(null);
    const [enquiryOpen, setEnquiryOpen] = useState(false);
    const [userPhone, setUserPhone] = useState("");
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        setImageUrl(
            coverImage?.StorageType === 'CLOUD' ? `${cdnUrl}${coverImage.path}` : coverImage?.url || null
        );

    }, [])

    const sendEnquiry = async () => {
        if (!userPhone.trim()) return setError("Please enter your contact number.");
        setSending(true);

        const templateParams = {
            user_phone: userPhone,
            product_title: product.title,
            product_description: product.description,
            product_price: product.price,
            contact: product.contact,
        };

        const template = import.meta.env.VITE_EMAILJS_ENQ_TEMP_ID

        try {
            await sendEmail(templateParams, template);
            setUserPhone("");
            setEnquiryOpen(false);
        } catch (error) {
            console.error("EmailJS Error:", error);
        } finally {
            setSending(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <h2 className="text-xl font-semibold text-gray-800">Product Details</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-sm">Close</button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Left Section - Images */}
                        <div className="flex-1">
                            <div className="w-full aspect-video border border-gray-100 rounded-lg overflow-hidden">
                                <Image
                                    src={imageUrl}
                                    alt="Main"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="mt-3 flex gap-2 overflow-x-auto">
                                {Images?.map((url, i) => (
                                    <Image
                                        key={i}
                                        src={url}
                                        alt={`More ${i}`}
                                        className="w-16 h-16 object-cover rounded-md border"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right Section - Details */}
                        <div className="flex-1 flex flex-col gap-3 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                <span className="font-medium">Title:</span> {product.title}
                            </div>
                            <div className="flex items-start gap-2">
                                <MessageCircle className="w-4 h-4 mt-0.5" />
                                <div>
                                    <span className="font-medium">Description:</span><br />
                                    {product.description}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Layers className="w-4 h-4" />
                                <span className="font-medium">Category:</span> {product.category?.name || "N/A"}
                            </div>
                            <div className="flex items-center gap-2">
                                <Box className="w-4 h-4" />
                                <span className="font-medium">Stock:</span> {product.stock}
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                <span className="font-medium">Price:</span> OMR {product.price}
                            </div>
                            <div className="flex items-center gap-2">
                                <Car className="w-4 h-4" />
                                <span className="font-medium">Vehicle:</span> 
                                <span translate="no">
                                {product.brand?.name || ""} {product.model} {product.variant} {product.year}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span className="font-medium">Contact:</span> {product.contact}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 flex justify-end gap-4">
                        <a
                            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            <Phone className="w-4 h-4" />
                            WhatsApp
                        </a>

                        <button
                            onClick={() => setEnquiryOpen(true)}
                            className="flex items-center gap-2 px-5 py-2 bg-black text-white rounded hover:bg-black/80"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Enquire Now
                        </button>
                    </div>
                </div>
            </div>
            
            {enquiryOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Enquire About Product</h3>
                        <p className="text-xs text-red-600">{error}</p>
                        <input
                            type="text"
                            placeholder="Enter your phone number or email"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setEnquiryOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={sendEnquiry}
                                disabled={sending}
                                className="px-4 py-2 bg-black text-white rounded hover:bg-black/80 disabled:opacity-50"
                            >
                                {sending ? "Sending..." : "Send"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default ProductDetailModal;
