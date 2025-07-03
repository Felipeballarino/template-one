import { Checkbox, InputNumber } from 'antd'
import React from 'react'
import { Controller } from 'react-hook-form'
import { calcularPorcentaje, calcularPrecioDescuento } from '../../../../../utils/helpers'

const PreciosSection = ({ control, viewPrecios, setViewPrecios, getValues, setValue }) => {


    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className='font-bold text-2xl mb-2'>Precios</h2>
            <Controller
                name="viewPrecios"
                control={control}
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                    <>
                        <Checkbox
                            checked={value}
                            onChange={e => {
                                const isChecked = e.target.checked
                                setViewPrecios(isChecked)
                                onChange(isChecked)
                            }}
                            className="block mb-8 font-medium w-full"
                        >
                            Mostrar precios en tienda
                        </Checkbox>
                    </>
                )}
            />
            <div className='flex gap-4 mt-2'>
                <Controller
                    name="precio"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <div className='w-full' >
                            <label className="block mb-1 text-gray-500 font-medium text-sm">Precio de venta<span className="text-red-500">*</span></label>
                            <InputNumber
                                {...field}
                                style={{ width: '100%' }}
                                type="number"
                                min={0}
                                placeholder="Ej: 19999.99"
                                required
                                disabled={!viewPrecios}
                                prefix={"$"}
                                onChange={(value) => {
                                    field.onChange(value)
                                    const currentDescuento = getValues('porcentajeDescuento')
                                    setValue('precioDescuento', calcularPrecioDescuento(value, currentDescuento))
                                }}
                            />
                        </div>
                    )}
                />
                <Controller
                    name="precioDescuento"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <div className='w-full'>
                            <label className="block mb-1 text-gray-500 font-medium text-sm">Precio promocional</label>
                            <InputNumber
                                {...field}
                                style={{ width: '100%' }}
                                type="number"
                                min={0}
                                placeholder="Ej: 19999.99"
                                prefix={"$"}
                                disabled={!viewPrecios}
                                onChange={(value) => {
                                    field.onChange(value)
                                    const currentPrecio = getValues('precio')
                                    setValue('porcentajeDescuento', calcularPorcentaje(currentPrecio, value))
                                }}
                            />
                        </div>
                    )}
                />
                <Controller
                    name="porcentajeDescuento"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <div className='w-full'>
                            <label className="block mb-1 text-gray-500 font-medium text-sm">Descuento (%)</label>
                            <InputNumber
                                {...field}
                                style={{ width: '100%' }}
                                type="number"
                                max={100}
                                min={0}
                                placeholder="Ej: 10"
                                required
                                prefix={"%"}
                                disabled={!viewPrecios}
                                onChange={(value) => {
                                    field.onChange(value)
                                    const currentPrecio = getValues('precio')
                                    setValue('precioDescuento', calcularPrecioDescuento(currentPrecio, value))
                                }}
                            />
                        </div>
                    )}
                />
            </div>
        </div>
    )
}

export default PreciosSection
