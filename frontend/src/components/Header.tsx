import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../api/lib/AuthContext";

const Header: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="w-full top-0 left-0 z-50 border-b border-black/10 fixed">
            <div className="max-w-5xl mx-auto -px-20 py-6 flex items-center justify-between">
                <span className="text-xl font-serif font-light tracking-[0.2em] text-black">
                    Manchester<span className="text-[#D4AF37]">.News</span>
                </span>
                <nav className="flex items-center gap-6">
                    <Link
                        to="/clients"
                        className="text-xs uppercase tracking-[0.15em] text-black/50 hover:text-[#D4AF37] transition-colors duration-200">
                        Clientes
                    </Link>
                    <Link
                        to="/feed"
                        className="text-xs uppercase tracking-[0.15em] text-black/50 hover:text-[#D4AF37] transition-colors duration-200">
                        Feed
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="text-xs uppercase tracking-[0.15em] text-black/50 hover:text-[#D4AF37] transition-colors duration-200">
                        Sair
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;