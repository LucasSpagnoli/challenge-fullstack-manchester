import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../api/lib/useAuth";

const Header: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="w-full border-b border-black/10">
            <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
                <span className="text-xl font-serif font-light tracking-[0.2em] text-black">
                    Manchester<span className="text-[#D4AF37]">.</span>
                </span>
                <nav className="flex items-center gap-6">
                    <Link
                        to="/preferences"
                        className="text-xs uppercase tracking-[0.15em] text-black/50 hover:text-[#D4AF37] transition-colors duration-200">
                        Preferências
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