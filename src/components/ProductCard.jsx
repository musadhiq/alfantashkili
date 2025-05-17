import React, { useEffect, useState } from 'react';
import productPlaceholder from '../assets/productPlaceholder.jpg';
import { Car, ShoppingCart } from 'lucide-react';
import ProductDetailModal from './ProductDetailModal';
import Image from './ui/Image';
import { useTranslation } from 'react-i18next';

function ProductCard({ product }) {
  const cdnUrl = import.meta.env.VITE_CDN_HOST || "";
  const coverImage = product.images?.find((image) => image.type === 'COVER');

  const [imageUrl, setImageUrl] = useState(null)
  const [openModal, setOpenModal] = useState(false);

      const { t, i18n } = useTranslation();
      const lang = i18n.language;

  useEffect(() => {
    setImageUrl(
      coverImage?.StorageType === 'CLOUD' ? `${cdnUrl}${coverImage.path}` : coverImage?.url || null
    );

  }, [])

  const openDetailedModal = () => {
    setOpenModal(true)
  }


  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border flex flex-col product-card h-[300px]">
        {/* Image Section */}
        <div className="w-full h-48  flex justify-center items-center card-image-container">
          {imageUrl ? <Image
            src={imageUrl}
            alt={product.title?.en}
            className={`object-contain w-full h-full p-[1px]`}
          /> : (
            <img src={productPlaceholder} alt="Product" className={`object-contain w-full h-full p-[1px] placeHolder`}></img>
          )}
        </div>
        {/* Info Section */}
        <div className="flex flex-col justify-between p-4 flex-1">
          {/* Title & Description */}
          <div>
            <h3 className="text-base font-semibold text-gray-800">{product.title?.[lang]}</h3>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Car className="w-4 h-4 text-gray-500" />
              <span className="font-medium" translate="no">{product.brand?.name || 'N/A'}  {product.model || ""} {product.variant} {product.year} </span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <div className="flex justify-between items-center mt-2">
              <span className=" font-semibold text-base flex items-center gap-1">
                <span className="text-xs font-bold italic text-gray-500 ml-1">OMR</span>
                {product.price}
              </span>
              <div className="flex gap-2">
                <button className="flex gap-2 items-center text-white bg-red-600 rounded-md px-3 py-2 hover:bg-red-500 text-xs" onClick={openDetailedModal}>
                 <span>{t("common.shopnow")}</span> <ShoppingCart size={15} />
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductDetailModal open={openModal} onClose={() => setOpenModal(false)} product={product} />
    </>
  );
}

export default ProductCard;
