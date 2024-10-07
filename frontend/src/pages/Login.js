import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
//import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import '../style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    //const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        // verificamos si el formulario es válido
        if (form.checkValidity() === false) {
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
        <div className='login template d-flex justify-content-center align-items-center vh-100 bg-primary'>
            <div className='form_container p-5 rounded bg-white'>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <h3 className='text-center'>Iniciar Sesión</h3>

                    <Row className='mb-3'>
                        <Form.Group as={Col} controlId='validationEmail'>
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type='email' 
                                placeholder='Ingresa tu E-mail' 
                                className='form-control'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback>Perfecto! :D</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>
                                Por favor ingresa un e-mail válido.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className='mb-3'>
                        <Form.Group as={Col} controlId='validationEmail'>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type='password' 
                                placeholder='Ingresa tu contraseña' 
                                className='form-control'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback>Perfecto! :D</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>
                                La contraseña es requerida.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <div className='d-grid'>
                        <Button type='submit' className='btn btn-primary'>
                            Iniciar Sesión
                        </Button>
                    </div>

                    <p className='text-center mt-2'>
                       No tienes una cuenta?<a href="/register" className='ms-2'>Registrarse</a>
                    </p>
                    
                </Form>
            </div>
        </div>

        
    );
};

export default Login;