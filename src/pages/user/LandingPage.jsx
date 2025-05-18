import React, { useEffect, useState } from 'react'
import HeroSection from '../../components/HeroSection'
import CatagoryFilter from "../../components/utilities/CategoryFilter"
import ProductCard from '../../components/ProductCard'
import { Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../store/thunks/productThunks'
import ProductFallBack from '../../components/ProductsFallback'
import { sendEmail } from '../../services/emailService'
import FeaturedProducts from '../../components/products/FeaturedProducts'
import CategoryCards from '../../components/CategoryCards'
import { useTranslation } from 'react-i18next';


function LandingPage() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [selectedCatagory, setSelectedCatagory] = useState('All');
  const [userPhone, setUserPhone] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let query = `?page=1&limit=10&orderBy=-createdAt`
    if (selectedCatagory !== 'All') {
      query += `&category=${selectedCatagory}`
    }
    dispatch(fetchProducts(query));
  }, [dispatch, selectedCatagory]);

  const handleCatagoryChange = (catagory) => {
    setSelectedCatagory(catagory);
  };


  const sendEnquiry = async () => {
    if (!userPhone.trim()) return setError("Please enter your contact number.");
    setSending(true);

    const templateParams = {
      user_phone: userPhone,
      user_message: userMessage
    };

    const template = import.meta.env.VITE_EMAILJS_REQ_TEMP_ID

    try {
      await sendEmail(templateParams, template);
      setUserPhone("");
      setUserMessage("")
    } catch (error) {
      console.error("EmailJS Error:", error);
    } finally {
      setSending(false);
    }
  };


  return (
    <>
      <section className="w-full bg-white pt-4">
        <HeroSection />
        <FeaturedProducts />
        <div className="mt-8">
          <CategoryCards />
        </div>
        <div className="max-w-[1400px] mx-auto px-1">
          <h1 className='text-2xl font-semibold mb-3'>Products</h1>
          <CatagoryFilter type="tab" handleValueChange={handleCatagoryChange} />
          {
            products.length === 0 ? (
              <ProductFallBack />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )
          }

          <div className="flex justify-center my-6">
            <Link to="/store" className="text-sm bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg ">
              {t('common.explore')} &nbsp;
              <Store size={16} className="inline-block ml-2" />
            </Link>
          </div>

          <div className="md:col-span-2 bg-black rounded-xl overflow-hidden px-6 py-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-10">
              {/* Left: Description */}
              <div className="flex-1 text-white">
                <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-4">
                  {t('inquirySection.title')}
                </h2>
                <p className="text-zinc-400 text-base leading-relaxed">
                  {t('inquirySection.description')}
                </p>
              </div>

              {/* Right: Form */}
              <form className="flex-1 flex flex-col gap-4 w-full">
                <div className="flex flex-col">
                  <label htmlFor="contact" className="text-sm text-zinc-300 mb-1">
                    {t('inquirySection.form.contactNumber')}
                  </label>
                  <input
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    type="text"
                    id="contact"
                    placeholder={t('inquirySection.form.contactPlaceholder')}
                    className="px-4 py-2 rounded-md border border-zinc-600 bg-zinc-900 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="note" className="text-sm text-zinc-300 mb-1">
                    {t('inquirySection.form.note')}
                  </label>
                  <textarea
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    id="note"
                    placeholder={t('inquirySection.form.notePlaceholder')}
                    rows="4"
                    className="px-4 py-2 rounded-md border border-zinc-600 bg-zinc-900 text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  />
                </div>

                <button
                  onClick={sendEnquiry}
                  disabled={sending}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-md self-start"
                >
                  {t('inquirySection.form.send')}

                </button>
              </form>
            </div>
          </div>


          <div className="flex flex-col md:flex-row items-center justify-between px-6 py-16 bg-white">
            <div className=" px-4 text-center max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                {t('promoSection.title')}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {t('promoSection.description')}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">

              </p>
              <a
                href="/store"
                className="inline-block bg-red-600 text-white px-6 py-3 mt-6 rounded-md hover:bg-red-700 transition"
              >
                {t('promoSection.button')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LandingPage