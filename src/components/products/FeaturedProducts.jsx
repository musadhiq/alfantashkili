import { DollarSign, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import productPlaceholder from '../../assets/productPlaceholder.jpg';
import Image from '../ui/Image';
import apiClient from '../../lib/apiService';
import ProductDetailModal from '../ProductDetailModal';
import { useTranslation } from 'react-i18next';


function FeaturedProducts() {
    const { t } = useTranslation();
    const cdnUrl = import.meta.env.VITE_CDN_HOST || "";
    const [products, setProducts] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await apiClient.get('/api/v1/products?featured=true&limit=16');
            setProducts(res.data.contents || []);
        } catch (error) {
            console.error(error);
        }
    };

    if (!products || products.length === 0) return null;

    // Find up to 2 tagged products
    const tagged = products.filter(p => p.tag).slice(0, 2);
    const others = products.filter(p => !tagged.includes(p));

    // Final product order: large first, normal, large last
    let displayProducts = [];
    if (tagged.length === 1) {
        displayProducts = [tagged[0], ...others];
    } else if (tagged.length === 2) {
        const middle = others.slice(0, 6);
        displayProducts = [tagged[0], ...middle, tagged[1]];
    } else {
        displayProducts = products;
    }

    const largeIds = tagged.map(p => p.id);

    return (
        <section className="max-w-[1440px] mx-auto px-4 my-16">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">{t("FeaturedProducts.title")}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 auto-rows-fr">
                {displayProducts.map((item) => {
                    const isLarge = largeIds.includes(item.id);
                    const coverImage = item.images?.find((image) => image.type === 'COVER');
                    const imageUrl = coverImage?.StorageType === 'CLOUD'
                        ? cdnUrl + coverImage?.path
                        : coverImage?.url || null;

                    return (
                        <div
                            key={item.id}
                            className={`bg-white rounded-xl overflow-hidden 
              ${isLarge ? 'md:col-span-2 md:aspect-video' : ''}`}
                        >
                            {!isLarge ? (
                                <ProductCard product={item} />
                            ) : (
                                <div className="relative w-full h-full">
                                    {imageUrl ? (
                                        <Image
                                            src={imageUrl}
                                            alt={item.title?.en}
                                            className="object-cover w-full h-full p-[1px]"
                                        />
                                    ) : (
                                        <img
                                            src={productPlaceholder}
                                            alt="Product"
                                            className="w-full h-full object-cover p-[1px] placeHolder"
                                        />
                                    )}
                                    {item.tag && (
                                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                            {item.tag}
                                        </span>
                                    )}
                                    <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-80 p-4">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title?.en}</h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {[item.brand?.name, item.model, item.variant, item.year].filter(Boolean).join(' • ')}
                                            {item.brand?.name || 'Brand'} • {item.model || 'Model'}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-red-600 font-semibold text-lg flex items-center gap-1">
                                                <DollarSign className="w-4 h-4" />
                                                {item.price}
                                            </p>
                                            <button className="flex gap-2 items-center text-white bg-red-600 rounded-md px-3 py-2 hover:bg-red-500" onClick={() => setOpenModal(true)}>
                                                <span>{t("hero.button")}</span> <ShoppingCart size={15} />
                                            </button>
                                            <ProductDetailModal open={openModal} onClose={() => setOpenModal(false)} product={item} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

        </section>
    );
}


export default FeaturedProducts;
