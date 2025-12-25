import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import '../styles/Products.css';

const ProductList = () => {
    const { category } = useParams();

    const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Collection';
    const filteredProducts = products.filter(p => p.category === category);

    return (
        <>
            <img src="/assets/background.jpg" alt="Background" className="background-img" />

            <section className="product-hero">
                <h1>{categoryName} Collection</h1>
                <p>Explore our beautiful selection of {category}.</p>
            </section>

            <section className="product-section">
                <div className="product-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p style={{ gridColumn: '1 / -1', fontSize: '1.2rem', color: '#666' }}>No products found in this category yet.</p>
                    )}
                </div>
            </section>
        </>
    );
};

export default ProductList;
