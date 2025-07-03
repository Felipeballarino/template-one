import { Modal, Input, Button, Typography } from 'antd';
import { useState } from 'react'
import { loginUser } from "../services/LoginServices"
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useAuthStore } from '../../../store/authStore';

const { Title, Text } = Typography;

const Login = ({ open, onClose }) => {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuthStore();

    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        const user = await loginUser(usuario, password);
        setLoading(false);

        if (user) {
            login(user);
            onClose();
            navigate('/admin');
        } else {
            Swal.fire({
                icon: "error",
                title: "Error al iniciar sesión",
                text: "Correo o contraseña incorrectos.",
            });
        }
    };

    return (
        <Modal
            title={null}
            open={open}
            onCancel={onClose}
            footer={null}
            centered
        >
            <div className="text-center space-y-4 p-4">
                <Title level={3}>Bienvenido</Title>
                <Text type="secondary">Ingresá tus datos para continuar</Text>

                <div className="space-y-3 mt-4 text-left">
                    <label className="text-sm text-gray-600">Correo electrónico</label>
                    <Input
                        placeholder="User"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        size="large"
                    />

                    <label className="text-sm text-gray-600">Contraseña</label>
                    <Input.Password
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        size="large"
                    />

                    <Button
                        type="primary"
                        block
                        size="large"
                        loading={loading}
                        onClick={handleLogin}
                    >
                        Iniciar Sesión
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default Login
