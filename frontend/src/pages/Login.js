import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
//import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

// Estilos o adornos a la pagina
import '../loginEstilo.css';
import myGif from '../assets/fondoAnimado.gif';
import logo from '../assets/ojoAbierto.gif';
import { MdAlternateEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";
import { AiOutlineSwapRight } from "react-icons/ai";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});
    //const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        let formIsValid = true;
        let validationErrors = {};

        if (!email) {
            formIsValid = false;
            validationErrors.email = "Ingresar el correo electrónico es obligatorio.";
        }

        if (!password) {
            formIsValid = false;
            validationErrors.password = "Ingresar una contraseña es obligatorio.";
        }

        setErrors(validationErrors);

        // verificamos si el formulario es válido
        if (form.checkValidity() === false && formIsValid) {
            e.stopPropagation();
        } else {
            try {
                const response = await loginUser({ email, password });

                //validamos que la respuesta tenga datos
                if (response && response.data) {
                    console.log('Login exitoso:', response.data);
                    toast.success('Login exitoso! Redirigiendo...', {autoClose: 2000});
                    setTimeout(() => {
                        navigate('/pet'); // Redirige después de 2 segundos
                    }, 2700);
                } else {
                    //Si no hay datos en la respuesta, mostramos error
                    toast.error('Error en el login: Respuesta inválida del servidor');
                }
                
            } catch (error) {
                //manejamos error del back o de la conexion
                if (error.response && error.response.data) {
                    toast.error('Error en el login:', error.response.data.message);
                } else {
                    toast.error('Error en el login: No se pudo conectar con el servidor');
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
                        <span className='text'>No tienes una cuenta?</span>
                        <Link to={'/register'}>
                            <button className='btn'>Registrarse</button>
                        </Link>
                    </div>
                </div>

                <div className='formDiv flex'>
                    <div className='headerDiv'>
                        <img src={logo} alt='Imagen del Logo'/>
                        <h3>INICIAR SESION</h3>
                    </div>

                    <form className='form grid' noValidate validated={validated} onSubmit={handleSubmit}>
                        <span></span>
                        <div className='inputDiv'>
                            <label htmlFor='email'>Correo Electrónico</label>
                            <div className='input flex'>
                                <MdAlternateEmail className='icon' />
                                <input 
                                    type='email'
                                    placeholder='Ingresa tu e-mail'
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
                            <span>Iniciar Sesión </span>
                            <AiOutlineSwapRight className='icon'/>
                        </button>

                    </form>
                </div>              
            </div>
        </div>    
    );
};

export default Login;