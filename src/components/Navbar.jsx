import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    // const isLoggedIn = sessionStorage.getItem("loggedIn") === "true"; // Deprecated
    const isLoggedIn = !!currentUser;
    const navigate = useNavigate();
    const location = useLocation();
    const { cart, wishlist } = useShop();

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    const handleRestrictedClick = (e, path) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert("Please log in to access this feature.");
        } else {
            // Allow navigation if logged in (although typically protected by route guards, this replicates the old behavior)
            // But since these are Links, we should probably just let them navigate if logged in, or prevent default.
            // However, for React Router, we act differently.
            // Using Links, we can't easily prevent default conditionally inside the Link logic without custom component.
            // So we'll use a span or button for restricted if not logged in?
            // Actually, the improved way is:
            if (isLoggedIn) {
                navigate(path);
            }
        }
    };

    // For standard links, we can use Link. For restricted, maybe we use a simple onClick handler.

    // Check if we are on login or signup to confirm what to show?
    // The original nav always showed mostly same links but some restricted.

    return (
        <nav className="navbar">
            <div className="logo-box">
                <img src="/assets/logo.jpeg" alt="Infinity Finds Logo" />
                <span>Infinity Finds</span>
            </div>

            <button
                className={`nav-toggle ${isOpen ? 'open' : ''}`}
                aria-label="Toggle navigation"
                onClick={toggleNav}
            >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>

            <ul className={`nav-links ${isOpen ? 'nav-open' : ''}`}>
                <li><Link to="/home" onClick={() => setIsOpen(false)}>Home</Link></li>

                {/* Restricted Links */}
                <li>
                    {isLoggedIn ? (
                        <Link to="/products" onClick={() => setIsOpen(false)}>Products</Link>
                    ) : (
                        <a href="#" onClick={(e) => { e.preventDefault(); alert("Please log in to access this feature."); setIsOpen(false); }}>Products</a>
                    )}
                </li>
                <li>
                    {isLoggedIn ? (
                        <Link to="/wishlist" onClick={() => setIsOpen(false)}>
                            Wishlist {wishlist.length > 0 && <span className="nav-badge">({wishlist.length})</span>}
                        </Link>
                    ) : (
                        <a href="#" onClick={(e) => { e.preventDefault(); alert("Please log in."); setIsOpen(false); }}>Wishlist</a>
                    )}
                </li>
                <li>
                    {isLoggedIn ? (
                        <Link to="/cart" onClick={() => setIsOpen(false)}>
                            Cart {cart.length > 0 && <span className="nav-badge">({cart.length})</span>}
                        </Link>
                    ) : (
                        <a href="#" onClick={(e) => { e.preventDefault(); alert("Please log in."); setIsOpen(false); }}>Add to Cart</a>
                    )}
                </li>

                <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>

                {!isLoggedIn && (
                    <>
                        <li><Link to="/" onClick={() => setIsOpen(false)}>Login</Link></li>
                        <li><Link to="/signup" onClick={() => setIsOpen(false)}>Signup</Link></li>
                    </>
                )}
                {isLoggedIn && (
                    <li><Link to="/" onClick={async () => {
                        await logout();
                        sessionStorage.removeItem("loggedIn");
                        setIsOpen(false);
                    }}>Logout</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
