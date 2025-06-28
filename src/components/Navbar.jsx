import React from "react";
import { Link } from "react-router-dom";
import logo from "../../src/assets/logo.png"
import search from "../../src/assets/searchIcon.svg"
import menu from "../../src/assets/menuIcon.svg"
import close from "../../src/assets/closeIcon.svg"
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";


const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Revenue Report', path: '/' },
        { name: 'Financial Report', path: '/' },
        { name: 'Overview', path: '/' },
    ];

const [isScrolled, setIsScrolled] = React.useState(false);
const [isMenuOpen, setIsMenuOpen] = React.useState(false);

const{openSignIn} = useClerk()
const {user} = useUser()

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
            <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

                {/* Logo */}
                <Link to = '/'>
                    <img src={logo} alt="logo" className={`h-22 max-w-[300px] ${isScrolled ? "invert opacity-100" : ""}`}/>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                            {link.name}
                            <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                        </a>
                    ))}
                    <button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`}>
                        Dashboard
                    </button>
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">
                    <img src={search} alt="search-icon"/>
                    <button onClick={openSignIn} className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500">

                      {user }
                        Login
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-3 md:hidden">
                    <img onClick={()=>setIsMenuOpen(!isMenuOpen)} src={menu} alt="menu-icon" />
                </div>

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                        <img src={close} alt="closeicon" className="h-6"/>
                    </button>

                {navLinks.map((link, i) => (
                    <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                        {link.name}
                    </a>
                ))}

                <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
                    New Launch
                </button>

                    <button onClick={openSignIn} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">

                        Login
                    </button>
                </div>
            </nav>
    );
}
export default Navbar


