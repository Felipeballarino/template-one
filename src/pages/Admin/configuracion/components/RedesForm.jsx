import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import { Input, Button, Checkbox } from 'antd';

const RedesForm = () => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            instagram: '',
            instagramView: false,
            twitter: '',
            twitterView: false,
            facebook: '',
            facebookView: false,
        }
    });

    const onSubmit = async (data) => {
        console.log("Datos para guardar:", data);

        reset()
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
            {[
                { name: 'instagram', label: 'Link Instagram', placeholder: 'https://instagram.com/tuusuario', type: "text", prefix: <InstagramOutlined /> },
                { name: 'twiter', label: 'Link Twiter', placeholder: 'https://twitter.com/tuusuario', type: "text", prefix: <TwitterOutlined /> },
                { name: 'facebook', label: 'Link Facebook', placeholder: 'https://facebook.com/tuusuario', type: "text", prefix: <FacebookOutlined /> }
            ].map(({ name, label, placeholder, type, prefix }) => (
                <div key={name}>
                    <div className='flex gap-2'>
                        <label className="block font-medium mb-1">{label}</label>
                        <Controller
                            name={`${name}View`}
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Checkbox
                                    checked={value}
                                    onChange={e => onChange(e.target.checked)}
                                    className="font-bold"
                                />
                            )}
                        />

                    </div>
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

export default RedesForm
