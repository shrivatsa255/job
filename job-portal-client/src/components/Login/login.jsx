import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './styles.module.css';
import axios from 'axios';

const Login = () => {
    const [data, setData] = useState({
        email: "", 
        password: "",
        role: "User" // Default role is User
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({currentTarget:input}) => {
        setData({...data, [input.name]:input.value});
    }

    const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const url = "http://localhost:3000/api/auth";
        const {data:res}  = await axios.post(url, data);
        // Assuming the token is directly accessible as res.data
        localStorage.setItem("token", res.data);
        console.log(res)
        // Store the user's email as well
        localStorage.setItem("userEmail", data.email);
        navigate('/home');
        window.location.reload()
        console.log(res.data);
    } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
            setError(error.response.data.message);
            console.log(error)
        }
    }
}


    return(
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login to Your Account</h1>
                        
                        <div>
                            <label>Role:</label>
                            <input
                                type='radio'
                                name='role'
                                value='User'
                                checked={data.role === 'User'}
                                onChange={handleChange}
                                className={styles.radioButton} // Ensure this matches the signup component
                            />
                            <label>User</label>
                            <input
                                type='radio'
                                name='role'
                                value='Recruiter'
                                checked={data.role === 'Recruiter'}
                                onChange={handleChange}
                                className={styles.radioButton} // Ensure this matches the signup component
                            />
                            <label>Recruiter</label>
                        </div>
                        
                        <input
                            type='email'
                            placeholder='Email'
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input} // Ensure this matches the signup component
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input} // Ensure this matches the signup component
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type='submit' className={styles.green_btn}>
                            Login
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>New Here ?</h1>
                    <Link to="/sign-up">
                        <button type='button' className={styles.white_btn}>
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default Login;
