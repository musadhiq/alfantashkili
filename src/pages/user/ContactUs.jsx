import { MapPin, Phone, Mail } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-6 py-16 text-zinc-800">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-base text-zinc-600 max-w-2xl mb-12 leading-relaxed">
        We're here to help. Whether you have a question about a product, your order, or just want to get in touch — feel free to reach out using the form or the contact details below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-red-500 mt-1" />
            <div>
              <p className="text-sm text-zinc-700 font-medium">Warehouse Address</p>
              <p className="text-sm text-zinc-600">Behind Al Maha Mktg. - Al buraimi -S. of Oman</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-red-500 mt-1" />
            <div>
              <p className="text-sm text-zinc-700 font-medium">Call Us</p>
              <p className="text-sm text-zinc-600">+968 9413 0119</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-red-500 mt-1" />
            <div>
              <p className="text-sm text-zinc-700 font-medium">Email</p>
              <p className="text-sm text-zinc-600">alfantashkili@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-6 bg-zinc-50 p-6 rounded-md shadow-sm">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Message</label>
            <textarea
              rows="4"
              required
              className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
