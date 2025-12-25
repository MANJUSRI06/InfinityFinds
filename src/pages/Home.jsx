import { useState, useEffect, useRef } from 'react';
import '../styles/Home.css';

const Home = () => {
    // Images for slider
    const originalImages = [
        "/assets/bracelet1.jpg",
        "/assets/pola1.jpg",
        "/assets/bracelet2.jpg",
        "/assets/pola2.jpg",
        "/assets/bracelet3.jpg",
        "/assets/pola 3.avif"
    ];

    const [index, setIndex] = useState(0);
    const delay = 3000;
    const timeoutRef = useRef(null);
    const sliderRef = useRef(null);

    const imgWidth = 320; // 300 + 20
    const images = [...originalImages, ...originalImages.slice(0, 3)];

    useEffect(() => {
        const resetTimeout = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };

        resetTimeout();

        timeoutRef.current = setTimeout(() => {
            setIndex((prevIndex) => {
                if (prevIndex === originalImages.length) {
                    return prevIndex + 1;
                } else {
                    return prevIndex + 1;
                }
            });
        }, delay);

        return () => {
            resetTimeout();
        };
    }, [index, originalImages.length]);

    const getTransform = () => {
        return `translateX(-${index * imgWidth}px)`;
    };

    const onTransitionEnd = () => {
        if (index >= originalImages.length) {
            if (sliderRef.current) {
                sliderRef.current.style.transition = 'none';
                setIndex(0);
            }
        }
    };

    useEffect(() => {
        if (sliderRef.current) {
            if (index === 0 && sliderRef.current.style.transition === 'none') {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        if (sliderRef.current) sliderRef.current.style.transition = 'transform 0.6s ease-in-out';
                    });
                });
            } else {
                sliderRef.current.style.transition = 'transform 0.6s ease-in-out';
            }
        }
    }, [index]);

    return (
        <>
            <img src="/assets/background.jpg" alt="Background" className="background-img" />

            <section className="hero">
                <h1>Welcome to Infinity Finds !!</h1>
                <p>Explore our collection of handmade accessories, unique gifts, and more.</p>
            </section>

            <section className="slider-container">
                <div
                    className="slider-track"
                    id="sliderTrack"
                    ref={sliderRef}
                    style={{ transform: getTransform() }}
                    onTransitionEnd={onTransitionEnd}
                >
                    {images.map((src, i) => (
                        <img key={i} src={src} alt="Slider Item" />
                    ))}
                </div>
            </section>

            <section className="why-choose-us">
                <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: '#f14872', marginBottom: '10px', letterSpacing: '1px' }}>Why Choose Us?</h2>
                <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#555', marginBottom: '30px' }}>We are passionate about delivering unique, quality, and memorable products to you!</p>
                <div className="features">
                    <div className="feature-card">
                        <img src="https://img.icons8.com/fluency/48/000000/handmade.png" alt="Handmade" style={{ marginBottom: '10px' }} />
                        <h3>Handmade with Love</h3>
                        <p>Every product is crafted with care and passion by skilled artisans.</p>
                    </div>
                    <div className="feature-card">
                        <img src="https://img.icons8.com/fluency/48/000000/gift.png" alt="Unique Gifts" style={{ marginBottom: '10px' }} />
                        <h3>Unique Gifts</h3>
                        <p>Find one-of-a-kind accessories and gifts you won't see anywhere else.</p>
                    </div>
                    <div className="feature-card">
                        <img src="https://img.icons8.com/fluency/48/000000/delivery.png" alt="Fast Delivery" style={{ marginBottom: '10px' }} />
                        <h3>Fast Delivery</h3>
                        <p>Quick and reliable shipping to get your favorites to your doorstep fast.</p>
                    </div>
                    <div className="feature-card">
                        <img src="https://img.icons8.com/fluency/48/000000/lock-2.png" alt="Secure Payment" style={{ marginBottom: '10px' }} />
                        <h3>Secure Payment</h3>
                        <p>Shop with confidence using our safe and secure payment options.</p>
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '38px' }}>
                    <a href="https://www.instagram.com/infinity_finds_05?utm_source=qr&igsh=bHprYjl5amczYjhz" target="_blank" rel="noreferrer" style={{ display: 'inline-block' }}>
                        <img src="https://img.icons8.com/fluency/48/000000/instagram-new.png" alt="Instagram" style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                    </a>
                    <span style={{ fontSize: '1.08rem', color: '#222', verticalAlign: 'middle' }}>You can also order using our <a href="https://instagram.com/YOUR_INSTAGRAM_ID" target="_blank" rel="noreferrer" style={{ color: '#f14872', fontWeight: '600', textDecoration: 'none' }}>Instagram page</a>!</span>
                </div>
            </section>
        </>
    );
};

export default Home;
