import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useShop } from '../context/ShopContext';
import '../styles/Products.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(p => p.id === id);
    const { addToCart, addToWishlist, isInWishlist, isInCart, removeFromWishlist } = useShop();

    if (!product) {
        return (
            <>
                <div style={{ textAlign: 'center', marginTop: '100px' }}>
                    <h2>Product not found</h2>
                    <button onClick={() => navigate('/products')} className="option-btn" style={{ margin: '20px auto' }}>Back to Products</button>
                </div>
            </>
        );
    }

    return (
        <>
            <img src="/assets/background.jpg" alt="Background" className="background-img" />

            <div className="product-details-container">
                <div className="product-image-large">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info-details">
                    <h2>{product.name}</h2>
                    <div className="price-large">{product.price}</div>
                    <p className="description-large">{product.description}</p>

                    <div className="options" style={{ alignItems: 'flex-start' }}>
                        <div className="action-buttons" style={{ justifyContent: 'flex-start' }}>
                            <button className="option-btn" style={{ fontSize: '1rem', padding: '10px 20px' }} onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}>
                                <span>&#10084;</span> {isInWishlist(product.id) ? 'Saved' : 'Wishlist'}
                            </button>
                            <button className="option-btn" style={{ fontSize: '1rem', padding: '10px 20px' }} onClick={() => addToCart(product)}>
                                {isInCart(product.id) ? <span>&#10003;</span> : <span>&#128722;</span>}
                                {isInCart(product.id) ? 'Added' : 'Add to Cart'}
                            </button>
                        </div>
                        {product.instagram && product.instagram !== "#" && (
                            <a href={product.instagram} className="insta-btn" target="_blank" rel="noreferrer" style={{ marginTop: '20px', display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#fff', textDecoration: 'none', background: '#f14872', padding: '10px 20px', borderRadius: '20px' }}>
                                <img src="/assets/insta logo.webp" alt="Instagram" style={{ width: '20px', height: '20px', filter: 'brightness(0) invert(1)' }} />
                                <span>View on Instagram</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
