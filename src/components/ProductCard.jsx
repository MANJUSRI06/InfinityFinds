import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import '../styles/Products.css';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart, addToWishlist, isInWishlist, isInCart, removeFromWishlist } = useShop();
    const [showModal, setShowModal] = useState(false);

    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScJnQX30Zkoi2Sei2c7dkPVOaQTILwAs0Cq2wRVnLP59YEvNw/viewform?usp=dialog";
    const INSTAGRAM_DM_URL = "https://www.instagram.com/infinity_finds_05?igsh=czRnbmF5MW5yMXU2";

    const handleOrderClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = (e) => {
        e.stopPropagation();
        setShowModal(false);
    };

    const handleGoogleForm = (e) => {
        e.stopPropagation();
        window.open(GOOGLE_FORM_URL, '_blank');
        setShowModal(false);
    };

    const handleInstaDM = (e) => {
        e.stopPropagation();
        window.open(INSTAGRAM_DM_URL, '_blank');
        setShowModal(false);
    };

    return (
        <>
            <div className="product-card">
                <img src={product.image} alt={product.name} />
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <div className="price">{product.price}</div>
                <div className="options">
                    {product.instagram && product.instagram !== "#" && (
                        <a href={product.instagram} className="insta-row" target="_blank" rel="noreferrer">
                            <img src="/assets/insta logo.webp" alt="Instagram" />
                            <span>Visit Here</span>
                        </a>
                    )}
                    <div className="action-buttons">
                        <button className="option-btn" onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}>
                            <span>&#10084;</span> {isInWishlist(product.id) ? 'Saved' : 'Wishlist'}
                        </button>
                        <button className="option-btn" onClick={() => addToCart(product)}>
                            {isInCart(product.id) ? <span>&#10003;</span> : <span>&#128722;</span>}
                            {isInCart(product.id) ? 'Added' : 'Add to Cart'}
                        </button>
                    </div>
                    <div className="view-details-center">
                        <button className="option-btn" onClick={handleOrderClick}>
                            <span>&#128221;</span> Order Now
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="order-modal-overlay" onClick={handleCloseModal}>
                    <div className="order-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Choose Order Method</h3>
                        <p>How would you like to place your order?</p>
                        <div className="order-options">
                            <button className="order-link-btn google-form-btn" onClick={handleGoogleForm}>
                                <span>&#128221;</span> Fill Google Form
                            </button>
                            <button className="order-link-btn insta-dm-btn" onClick={handleInstaDM}>
                                <img src="/assets/insta logo.webp" alt="Insta" style={{ width: '20px', filter: 'brightness(0) invert(1)' }} />
                                DM on Instagram
                            </button>
                        </div>
                        <button className="close-modal-btn" onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCard;
