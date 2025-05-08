import { PhoneCall, Search } from "lucide-react";
import LogoImage from '../../assets/logo.png'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateFilters } from "../../features/products/filtersSlice";

const TopNavbar = () => {

    const [searchInput, setSearchInput] = useState('');
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handlesearch = (e) => {
        e.preventDefault();
        dispatch(updateFilters({ search: searchInput }))
        if (!searchInput) return
        navigate(`/store`);
    };

    return (
        <div className="w-full bg-white text-zinc-900 px-4 py-2 shadow">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={LogoImage} alt="Logo" className="w-16 h-12 object-cover filter bg-black rounded-lg" />
                    <span className="text-base font-semibold">ALFAN ALTASHKILI</span>
                </Link>

                {/* Search Input */}
                <div className="flex-1 hidden md:block max-w-md w-full relative">
                    <form onSubmit={handlesearch}>
                        <input
                            type="text"
                            placeholder="Search our store..."
                            value={searchInput}
                            onChange={handleSearchChange}
                            className="w-full bg-zinc-100 border border-zinc-300 rounded-lg px-4 py-2 pr-10 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <button className="absolute right-[-30px] top-[15px] -translate-y-1/2 w-4 h-4 text-zinc-500 cursor-pointer"
                        onClick={handlesearch}
                        >

                            <Search />
                        </button>
                    </form>
                </div>

                {/* Help Button */}
                <a href="tel:+96894130119" className="p-2 rounded-lg hover:bg-zinc-100 transition border border-zinc-300 flex items-center gap-2 text-xs">
                    <PhoneCall className="w-5 h-5 text-zinc-700" /> <span>Call Us</span>
                </a>
            </div>
            <div className="flex-1 md:hidden max-w-md w-full relative pt-3">
                <form onSubmit={handlesearch}>
                    <input
                        type="text"
                        placeholder="Search our store..."
                        value={searchInput}
                        onChange={handleSearchChange}
                        className="w-full bg-zinc-100 border border-zinc-300 rounded-lg px-4 py-2 pr-10 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <Search className="absolute right-3 top-[1.8rem] -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                </form>
            </div>
        </div>
    );
};

export default TopNavbar;

