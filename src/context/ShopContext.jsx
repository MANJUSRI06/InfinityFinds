import { createContext, useState, useEffect, useContext } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    // Initialize state from local storage or empty array
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    // Effect to persist to local storage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToCart = (product) => {
        setCart((prev) => {
            // Check if already in cart
            if (prev.find(item => item.id === product.id)) {
                alert("Item already in cart!");
                return prev;
            }
            return [...prev, product];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter(item => item.id !== productId));
    };

    const addToWishlist = (product) => {
        setWishlist((prev) => {
            if (prev.find(item => item.id === product.id)) {
                alert("Item already in wishlist!");
                return prev;
            }
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prev) => prev.filter(item => item.id !== productId));
    };

    // Simple helper to parse price string "₹80" to number
    const getCartTotal = () => {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
            return total + (isNaN(price) ? 0 : price);
        }, 0);
    };

    const isInWishlist = (id) => !!wishlist.find(item => item.id === id);
    const isInCart = (id) => !!cart.find(item => item.id === id);

    return (
        <ShopContext.Provider value={{
            cart,
            wishlist,
            addToCart,
            removeFromCart,
            addToWishlist,
            removeFromWishlist,
            getCartTotal,
            isInWishlist,
            isInCart
        }}>
            {children}
        </ShopContext.Provider>
    );
};
