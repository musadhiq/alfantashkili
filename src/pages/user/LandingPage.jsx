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


function LandingPage() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
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
      <HeroSection />
      <section className="w-full bg-white pt-4">
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
                    actions={
                      <button className="text-sm text-blue-600 hover:underline">View</button>
                    }
                  />
                ))}
              </div>
            )
          }

          <div className="flex justify-center my-6">
            <Link to="/store" className="text-sm bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg ">
              Explore our store &nbsp;
              <Store size={16} className="inline-block ml-2" />
            </Link>
          </div>

          <div className="md:col-span-2 bg-black rounded-xl overflow-hidden px-6 py-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-10">
              {/* Left: Description */}
              <div className="flex-1 text-white">
                <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-4">
                  Can’t find what you’re looking for?
                </h2>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Fill in your contact details and leave a note with your requirements. Our team will review it and reach out with the best options available.
                </p>
              </div>

              {/* Right: Form */}
              <form className="flex-1 flex flex-col gap-4 w-full">
                <div className="flex flex-col">
                  <label htmlFor="contact" className="text-sm text-zinc-300 mb-1">
                    Contact Number
                  </label>
                  <input
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    type="text"
                    id="contact"
                    placeholder="Enter your number"
                    className="px-4 py-2 rounded-md border border-zinc-600 bg-zinc-900 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="note" className="text-sm text-zinc-300 mb-1">
                    Note
                  </label>
                  <textarea
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    id="note"
                    placeholder="Your request..."
                    rows="4"
                    className="px-4 py-2 rounded-md border border-zinc-600 bg-zinc-900 text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  />
                </div>

                <button
                  onClick={sendEnquiry}
                  disabled={sending}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-md self-start"
                >
                  Send Request
                </button>
              </form>
            </div>
          </div>


          <div className="flex flex-col md:flex-row items-center justify-between px-6 py-16 bg-white">
            <div className=" px-4 text-center max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Got a broken car? We’ve got the fix.
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Whether it’s a shattered headlight, a faulty engine part, or a missing bumper,
                we help you get your car back on the road without breaking the bank.
                Our massive inventory of second-hand parts is quality-checked and priced just right. Select your vehicle, filter by model or brand, and explore thousands of genuine parts ready for delivery.
                No more long waits or overpriced components—only what fits, when you need it.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">

              </p>
              <a
                href="/store"
                className="inline-block bg-red-600 text-white px-6 py-3 mt-6 rounded-md hover:bg-red-700 transition"
              >
                Start Searching Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LandingPage