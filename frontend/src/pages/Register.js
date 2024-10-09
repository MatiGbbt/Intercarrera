import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../loginEstilo.css';
import myGif from '../assets/fondoAnimado.gif';
import logo from '../assets/ojoAbierto.gif';
import { MdAlternateEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";
import { AiOutlineSwapRight } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        let formIsValid = true;
        let validationErrors = {};

        if (!username) {
            formIsValid = false;
            validationErrors.username = "Ingresar un usuario es obligatorio.";
        }

        if (!email) {
            formIsValid = false;
            validationErrors.email = "Ingresar un correo electrónico es obligatorio.";
        }

        if (!password) {
            formIsValid = false;
            validationErrors.password = "Ingresar una contraseña es obligatorio.";
        }

        setErrors(validationErrors);

        if (form.checkValidity() === false && formIsValid) {
            e.stopPropagation();
        } else {
            try {
                const response = await registerUser({ username, email, password });

                if (response && response.data) {
                    console.log('Registro exitoso:', response.data); 
                    toast.success('Registro exitoso! Redirigiendo...', {autoClose: 2000});
                    setTimeout(() => {
                        navigate('/login'); // Redirige después de 2 segundos
                    }, 2700);
                } else {
                    toast.error('Error en el registro: Respuesta inválida del servidor');
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    toast.error('Error en el registro:', error.response.data.message);
                } else {
                    toast.error('Error en el registro: No se pudo conectar con el servidor');
                }
            }
        }

        setValidated(true);
    };

    return (
        <div className='loginPage flex'>
            <div className='container flex'>

                <div className='videoDiv'>
                    <img src={myGif} alt='fondoAnimado'></img>

                    <div className='footerDiv flex'>
                        <span className='text'>Ya tienes una cuenta?</span>
                        <Link to={'/login'}>
                            <button className='btn'>Iniciar Sesión</button>
                        </Link>
                    </div>
                </div>

                <div className='formDiv flex'>
                    <div className='headerDiv'>
                        <img src={logo} alt='Imagen del Logo'/>
                        <h3>BIENVENIDO!</h3>
                    </div>

                    <form className='form grid' noValidate validated={validated} onSubmit={handleSubmit}>
                        <span></span>
                        <div className='inputDiv'>
                            <label htmlFor='username'>Usuario</label>
                            <div className='input flex'>
                                <FaRegUser className='icon' />
                                <input 
                                    type='email'
                                    placeholder='Ingresa tu usuario'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className={errors.username ? 'inputError' : ''}
                                    required
                                />
                            </div>
                            {errors.username && <span className='error'>{errors.username}</span>}
                        </div>

                        <div className='inputDiv'>
                            <label htmlFor='email'>Correo Electrónico</label>
                            <div className='input flex'>
                                <MdAlternateEmail className='icon' />
                                <input 
                                    type='text'
                                    placeholder='Ingresa tu nombre de usuario'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={errors.email ? 'inputError' : ''}
                                    required
                                />
                            </div>
                            {errors.email && <span className='error'>{errors.email}</span>}
                        </div>

                        <div className='inputDiv'>
                            <label htmlFor='password'>Contraseña</label>
                            <div className='input flex'>
                                <PiPasswordBold  className='icon' />
                                <input 
                                    type='password'
                                    placeholder='Ingresa tu contraseña'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={errors.password ? 'inputError' : ''}
                                    required
                                />
                            </div>
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>

                        <button type='submit' className='btn flex'>
                            <span>Registrarse </span>
                            <AiOutlineSwapRight className='icon'/>
                        </button>
 
                    </form>
                </div>
                
            </div>
        </div>
    );

};

export default Register;