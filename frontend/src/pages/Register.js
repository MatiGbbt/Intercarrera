import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        if (form.checkValidity() === false) {
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
        <div className='register template d-flex justify-content-center align-items-center vh-100 bg-primary'>
            <div className='form_container p-5 rounded bg-white'>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <h3 className='text-center'>Registrarse</h3>

                    <Row className='mb-3'>
                        <Form.Group as={Col} controlId='validationUsername'>
                            <Form.Label>Nombre de Usuario</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Ingresa tu nombre de usuario'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback>Perfecto! :D</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>
                                Por favor ingresa un nombre de usuario.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className='mb-3'>
                        <Form.Group as={Col} controlId='validationEmail'>
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Ingresa tu E-mail'
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
                        <Form.Group as={Col} controlId='validationPassword'>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Ingresa tu contraseña'
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
                            Registrarse
                        </Button>
                    </div>

                    <p className='text-center mt-2'>
                        Ya tienes una cuenta? <a href='/login'>Iniciar sesión</a>
                    </p>
                </Form>
            </div>
        </div>
    );

};

export default Register;