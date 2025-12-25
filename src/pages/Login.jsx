import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import Navbar from '../components/Navbar';
import '../styles/Auth.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            setError('');
            await login(credentials.username, credentials.password);
            sessionStorage.setItem("loggedIn", "true"); // Keep this for legacy check in Navbar for now, or update Navbar?
            // Actually Navbar should listen to AuthContext. But to be safe let's remove this legacy line eventually.
            navigate('/home');
        } catch (err) {
            setError('Failed to login. Please check your email and password.');
            console.error(err);
        }
    };

    return (
        <>
            <img src="/assets/background.jpg" alt="Background" className="background-img" />
            <div className="container">
                <form onSubmit={loginUser} className="form">
                    <h2>Login</h2>
                    {error && <p className="error-msg" style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
                    <div className="input-group">
                        <input
                            type="email"
                            name="username"
                            placeholder="Email"
                            required
                            value={credentials.username}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                    <p className="signup-link">New user? <Link to="/signup">Sign up here</Link></p>
                </form>
            </div>
        </>
    );
};

export default Login;
