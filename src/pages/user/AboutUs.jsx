import {
    Wrench,
    ShieldCheck,
    Truck,
    Users,
    MapPin,
    Phone,
    Mail,
  } from "lucide-react";
  
  const AboutUs = () => {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-16 text-zinc-800">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About <span className="text-red-600">ALFAN ALTASHKILI</span></h1>
        <p className="text-base text-zinc-600 max-w-3xl mb-12 leading-relaxed">
          At <strong>Alfantashkili</strong>, we specialize in sourcing and delivering reliable second-hand car parts across Oman.
          Our mission is to make automotive repair affordable and accessible, without compromising on quality.
          Whether you're a mechanic, workshop owner, or a vehicle enthusiast — we’re here to help you get the parts you need, fast and fairly priced.
        </p>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="flex items-start gap-4">
            <Wrench className="w-6 h-6 text-red-500 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Genuine Used Parts</h3>
              <p className="text-sm text-zinc-600">
                We source and inspect every part to ensure it's in top working condition — saving you money while maintaining performance.
              </p>
            </div>
          </div>
  
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-red-500 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Trusted Quality</h3>
              <p className="text-sm text-zinc-600">
                Our inventory is curated by experts. Every part is tested and verified to meet quality standards before it's sold.
              </p>
            </div>
          </div>
  
          <div className="flex items-start gap-4">
            <Truck className="w-6 h-6 text-red-500 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Fast Delivery</h3>
              <p className="text-sm text-zinc-600">
                We offer quick and secure delivery across Oman, ensuring your parts arrive exactly when you need them.
              </p>
            </div>
          </div>
  
          <div className="flex items-start gap-4">
            <Users className="w-6 h-6 text-red-500 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Customer-First Approach</h3>
              <p className="text-sm text-zinc-600">
                We’re here to support you. Our customer support team is ready to answer your questions and assist with orders.
              </p>
            </div>
          </div>
        </div>
  
        <div className="bg-zinc-100 p-6 rounded-md shadow-sm space-y-3">
          <h2 className="text-xl font-semibold mb-2">Visit Our Warehouse</h2>
          <div className="flex items-center gap-2 text-sm text-zinc-700">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>Behind Al Maha Mktg. - Al buraimi -S. of Oman</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-700">
            <Phone className="w-4 h-4 text-red-500" />
            <span>+968 9413 0119</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-700">
            <Mail className="w-4 h-4 text-red-500" />
            <span>alfantashkili@gmail.com</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default AboutUs;
  