import { useState } from 'react';
import '../styles/Home.css';
import '../styles/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, subject, message } = formData;

        // Construct mailto link
        const mailtoLink = `mailto:infinityfinds05@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\n\nMessage:\n${message}`)}`;

        window.location.href = mailtoLink;
    };

    return (
        <>
            <img src="/assets/background.jpg" alt="Background" className="background-img" />

            <section className="hero">
                <h1>Contact Us</h1>
                <p>We'd love to hear from you! Reach out for any queries or custom orders.</p>
            </section>

            <section className="contact-section">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="What is this regarding?"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="6"
                            placeholder="Write your message here..."
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="contact-button">
                        Send Message
                    </button>

                    <p style={{ textAlign: 'center', marginTop: '20px', color: '#777', fontSize: '0.9rem' }}>
                        * This will open your default email client.
                    </p>
                </form>
            </section>
        </>
    );
};

export default Contact;
