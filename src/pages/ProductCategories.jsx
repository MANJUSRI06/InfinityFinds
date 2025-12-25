// import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import '../styles/Products.css';

const ProductCategories = () => {
    const navigate = useNavigate();

    return (
        <>
            <img src="/assets/background.jpg" alt="Background" className="background-img" />
            <section className="product-hero">
                <h1>Our Products</h1>
                <p>Discover unique, handcrafted accessories and gifts made just for you!</p>
            </section>

            <section className="category-section">
                <div className="category-card" onClick={() => navigate('/products/bracelets')}>
                    <img src="/assets/bracelet card.avif" alt="Bracelets" />
                    <h3>Bracelets</h3>
                    <p>Explore our collection of handmade beaded bracelets crafted with love.</p>
                    <button onClick={(e) => { e.stopPropagation(); navigate('/products/bracelets'); }}>View Bracelets</button>
                </div>

                <div className="category-card" onClick={() => navigate('/products/polaroids')}>
                    <img src="/assets/polaroid card.avif" alt="Polaroids" />
                    <h3>Polaroids</h3>
                    <p>Shop aesthetic polaroids perfect for gifts, journaling, or decor.</p>
                    <button onClick={(e) => { e.stopPropagation(); navigate('/products/polaroids'); }}>View Polaroids</button>
                </div>
            </section>
        </>
    );
};

export default ProductCategories;
