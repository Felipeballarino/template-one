import { useState } from 'react'
import Layout from '../../shared/layout/Layout'
import { Steps, Button, Input, Radio, Form, Typography, Divider } from 'antd'
import { useCartStore } from '../../store/cartStore'
import Seo from '../../shared/seo/Seo'

const { Step } = Steps
const { Title } = Typography

const CheckoutPage = () => {
    const { cart, cartTotal } = useCartStore()
    const [current, setCurrent] = useState(1)
    const [form] = Form.useForm()
    const [envioSeleccionado, setEnvioSeleccionado] = useState(null)

    const next = () => setCurrent(current + 1)
    const prev = () => setCurrent(current - 1)

    const steps = [
        {
            title: 'Carrito',
            content: (
                <div>
                    <Title level={4}>Tu carrito</Title>
                    <ul className="mb-4">
                        {cart.map((item) => (
                            <li key={item.id}>
                                {item.nombre} - {item.quantity} x ${item.precio}
                            </li>
                        ))}
                    </ul>
                    <p><strong>Total: ${cartTotal()}</strong></p>
                    <Button type="primary" onClick={next}>Continuar</Button>
                </div>
            ),
        },
        {
            title: 'Entrega',
            content: (
                <Form layout="vertical" form={form}>
                    {!envioSeleccionado && (
                        <>
                            <Title level={4}>Información de entrega</Title>
                            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="codigoPostal" label="Código Postal" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Button type="primary" onClick={() => setEnvioSeleccionado('mostrarOpciones')}>
                                Continuar
                            </Button>
                        </>
                    )}

                    {envioSeleccionado === 'mostrarOpciones' && (
                        <>
                            <Title level={4}>Seleccioná una opción de entrega</Title>
                            <Radio.Group
                                onChange={(e) => setEnvioSeleccionado(e.target.value)}
                                value={envioSeleccionado}
                            >
                                <Radio value="envio">Envío a domicilio ($2000)</Radio>
                                <Radio value="retiro">Retiro en local (Gratis)</Radio>
                            </Radio.Group>
                        </>
                    )}

                    {envioSeleccionado === 'envio' && (
                        <>
                            <Divider />
                            <Title level={5}>Datos del destinatario</Title>
                            <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="apellido" label="Apellido" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="telefono" label="Teléfono" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="calle" label="Calle" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="numero" label="Número" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="departamento" label="Departamento (opcional)">
                                <Input />
                            </Form.Item>
                            <Form.Item name="barrio" label="Barrio" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="ciudad" label="Ciudad" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="documento" label="CUIT o DNI" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </>
                    )}

                    {envioSeleccionado && (
                        <div className="flex gap-2 mt-4">
                            <Button onClick={prev}>Atrás</Button>
                            <Button type="primary" onClick={next}>Continuar</Button>
                        </div>
                    )}
                </Form>
            ),
        },
        {
            title: 'Pago',
            content: (
                <div>
                    <Title level={4}>Elegí el método de pago</Title>
                    {/* Aquí iría tu lógica de pasarela de pago */}
                    <p>[Pasarela de pago aquí]</p>
                    <Button onClick={prev}>Atrás</Button>
                    <Button type="primary" htmlType="submit">Pagar</Button>
                </div>
            ),
        },
    ]

    return (
        <>
            <Seo title={"Checkout"} description="Checkout en web" />
            <Layout>
                <div className="max-w-3xl mx-auto p-6">
                    <Steps current={current} className="mb-6">
                        {steps.map((item) => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <div>{steps[current].content}</div>
                </div>
            </Layout>
        </>
    )
}

export default CheckoutPage
