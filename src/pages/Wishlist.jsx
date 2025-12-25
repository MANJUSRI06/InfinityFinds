import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import '../styles/Products.css';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useShop();

    return (
        <>
            <img src="/assets/background.jpg" alt="Background" className="background-img" />
            <section className="product-hero">
                <h1>My Wishlist</h1>
                <p>Your favorite items saved for later.</p>
            </section>

            <section className="product-section">
                <div className="product-grid">
                    {wishlist.length > 0 ? (
                        wishlist.map(product => (
                            <div key={product.id} style={{ position: 'relative' }}>
                                <ProductCard product={product} />
                                <button
                                    onClick={() => removeFromWishlist(product.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '15px', right: '15px',
                                        background: 'white', border: 'None',
                                        borderRadius: '50%', width: '30px', height: '30px',
                                        cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                                        color: '#f14872', fontWeight: 'bold'
                                    }}
                                    title="Remove from Wishlist"
                                >
                                    X
                                </button>
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '50px' }}>
                            <h3>Your wishlist is empty</h3>
                            <a href="/products" className="option-btn" style={{ marginTop: '20px', display: 'inline-block' }}>Browse Products</a>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Wishlist;
