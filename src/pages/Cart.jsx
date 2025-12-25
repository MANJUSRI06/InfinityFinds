import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import '../styles/Products.css';

const Cart = () => {
    const { cart, removeFromCart, getCartTotal } = useShop();
    const [showModal, setShowModal] = useState(false);

    // Reuse the modal logic
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/1uqwUiIyl6ilK84p2y-O5atsv2AZXzus2CAjIroCGSpI";
    const INSTAGRAM_DM_URL = "https://www.instagram.com/infinity_finds_05?igsh=czRnbmF5MW5yMXU2";

    const handleCheckout = () => {
        if (cart.length === 0) return;
        setShowModal(true);
    };

    const handleGoogleForm = () => {
        window.open(GOOGLE_FORM_URL, '_blank');
        setShowModal(false);
    };

    const handleInstaDM = () => {
        window.open(INSTAGRAM_DM_URL, '_blank');
        setShowModal(false);
    };

    return (
        <>
            <img src="/assets/background.jpg" alt="Background" className="background-img" />
            <section className="product-hero">
                <h1>My Shopping Cart</h1>
                <p>Review your items before ordering.</p>
            </section>

            <div className="product-section" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
                {cart.length > 0 ? (
                    <>
                        {cart.map(item => (
                            <div key={item.id} style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                background: 'rgba(255,255,255,0.9)', padding: '15px', margin: '10px 0',
                                borderRadius: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} />
                                    <div>
                                        <h4 style={{ margin: '0', color: '#f14872' }}>{item.name}</h4>
                                        <p style={{ margin: '0', color: '#555', fontSize: '0.9rem' }}>{item.price}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    style={{
                                        background: 'none', border: 'none', color: '#ccc',
                                        cursor: 'pointer', fontSize: '1.2rem'
                                    }}
                                >
                                    &#10005;
                                </button>
                            </div>
                        ))}

                        <div style={{ marginTop: '30px', textAlign: 'right', padding: '20px', background: '#fff', borderRadius: '20px' }}>
                            <h3 style={{ color: '#333' }}>Total: ₹{getCartTotal()}</h3>
                            <button
                                className="option-btn"
                                style={{ fontSize: '1.1rem', padding: '12px 30px', marginTop: '15px', marginLeft: 'auto' }}
                                onClick={handleCheckout}
                            >
                                Checkout Rows
                            </button>
                        </div>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <h3>Your cart is empty</h3>
                        <a href="/products" className="option-btn" style={{ marginTop: '20px', display: 'inline-flex' }}>Start Shopping</a>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="order-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="order-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Proceed to Checkout</h3>
                        <p>How would you like to place your order?</p>
                        <div className="order-options">
                            <button className="order-link-btn google-form-btn" onClick={handleGoogleForm}>
                                <span>&#128221;</span> Fill Google Form (Manual Order)
                            </button>
                            <button className="order-link-btn insta-dm-btn" onClick={handleInstaDM}>
                                <img src="/assets/insta logo.webp" alt="Insta" style={{ width: '20px', filter: 'brightness(0) invert(1)' }} />
                                DM List on Instagram
                            </button>
                        </div>
                        <button className="close-modal-btn" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;
