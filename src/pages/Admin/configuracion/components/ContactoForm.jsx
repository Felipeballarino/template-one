import { Button, Input } from 'antd';
import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { EnvironmentOutlined, MailOutlined, PhoneOutlined, WhatsAppOutlined } from '@ant-design/icons';

const ContactoForm = () => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            gmail: '',
            telefono: '',
            direccion: '',
        }
    });

    const onSubmit = async (data) => {
        console.log("Datos para guardar:", data);

        reset()
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            {[
                { name: 'telefono', label: 'Teléfono', placeholder: '+54 9 11 1234-5678', type: "number", prefix: <PhoneOutlined /> },
                { name: 'whatsapp', label: 'WhatsApp', placeholder: '+54 9 11 1234-5678', type: "number", prefix: <WhatsAppOutlined /> },
                { name: 'gmail', label: 'Gmail', placeholder: 'tucorreo@gmail.com', type: "email", prefix: <MailOutlined /> },
                { name: 'direccion', label: 'Dirección', placeholder: 'Calle Falsa 123, Ciudad', type: "text", prefix: <EnvironmentOutlined /> },
            ].map(({ name, label, placeholder, type, prefix }) => (
                <div key={name}>
                    <label className="block font-medium mb-1">{label}</label>
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                            <Input {...field} type={type} placeholder={placeholder} prefix={prefix} />
                        )}
                    />
                </div>
            ))}

            <Button type="primary" htmlType="submit" className='flex w-fit'>
                Guardar
            </Button>
        </form>
    )
}

export default ContactoForm
