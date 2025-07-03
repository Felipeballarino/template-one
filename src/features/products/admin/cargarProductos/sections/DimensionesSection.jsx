import { Input } from 'antd'
import React from 'react'
import { Controller } from 'react-hook-form'

const DimensionesSection = ({ control }) => {
    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className='font-bold text-2xl mb-2'>Peso y dimensiones</h2>
            <p className='mb-2'>Ingresá los datos para calcular el costo de envío de los productos y mostrar los medios de envío en tu tienda.</p>
            <div className='flex gap-4'>
                <Controller
                    name="peso"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <div className='w-1/2'>
                            <label className="block mb-1 text-gray-500 font-medium text-sm">Peso</label>
                            <Input
                                {...field}
                                className='w-full'
                                type="number"
                                placeholder="0.00"
                                suffix={"kg"}
                            />
                        </div>
                    )}
                />
                <Controller
                    name="profundidad"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <div className='w-1/2'>
                            <label className="block mb-1 text-gray-500 font-medium text-sm">Profundidad</label>
                            <Input
                                {...field}
                                className='w-full'
                                type="number"
                                placeholder="0.00"
                                suffix={"cm"}
                            />
                        </div>
                    )}
                />
                <Controller
                    name="ancho"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <div className='w-1/2'>
                            <label className="block mb-1 text-gray-500 font-medium text-sm">Ancho</label>
                            <Input
                                {...field}
                                className='w-full'
                                type="number"
                                placeholder="0.00"
                                suffix={"cm"}
                            />
                        </div>
                    )}
                />
                <Controller
                    name="alto"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <div className='w-1/2'>
                            <label className="block mb-1 text-gray-500 font-medium text-sm">Alto</label>
                            <Input
                                {...field}
                                className='w-full'
                                type="number"
                                placeholder="0.00"
                                suffix={"cm"}
                            />
                        </div>
                    )}
                />
            </div>
        </div>
    )
}

export default DimensionesSection
