import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const Signup = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signup } = useAuth();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const signupUser = async (e) => {
        e.preventDefault();

        if (userData.password !== userData.confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            setError('');
            await signup(userData.email, userData.password);
            // Optionally store username in DB, but Firebase Auth just needs email/pass.
            navigate('/home');
        } catch (err) {
            console.error("Signup Error Details:", err);
            // Check for specific Firebase error codes
            if (err.code === 'auth/weak-password') {
                setError('Password is too weak. Please use at least 6 characters.');
            } else if (err.code === 'auth/email-already-in-use') {
                setError('Email is already registered. Try logging in.');
            } else if (err.code === 'auth/operation-not-allowed') {
                setError('Email/Password login is not enabled in Firebase Console.');
            } else {
                setError('Failed to create an account. ' + err.message);
            }
        }
    };

    return (
        <>
            <img src="/assets/background.jpg" alt="Background" className="background-img" />
            <div className="auth-container">
                <h2>Sign Up</h2>
                {error && <p className="error-msg" style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
                <form onSubmit={signupUser} className="auth-form">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username (optional)"
                        value={userData.username}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={userData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={userData.password}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                        value={userData.confirmPassword}
                        onChange={handleChange}
                    />
                    <button type="submit" className="submit-btn">Sign Up</button>
                </form>
                <div className="auth-footer">
                    <p>Already have an account? <Link to="/">Login here</Link></p>
                </div>
            </div>
        </>
    );
};

export default Signup;
