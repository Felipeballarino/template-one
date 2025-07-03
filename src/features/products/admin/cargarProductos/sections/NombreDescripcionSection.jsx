import { Input } from 'antd'
import { Controller } from 'react-hook-form'
import EditorTextArea from '../../../components/atoms/EditorTextArea'

const NombreDescripcionSection = ({ control }) => {
    return (
        <div className='bg-white p-6 rounded shadow'>
            <h2 className='font-bold text-2xl mb-2'>Nombre y Descripcion</h2>
            <Controller
                name="nombre"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <>
                        <label className="block mb-1 text-gray-500 font-medium text-sm">Nombre<span className="text-red-500">*</span></label>
                        <Input {...field} placeholder="Ej: Zapatillas Nike" required />
                    </>
                )}
            />

            <Controller
                name="descripcion"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <>
                        <label className="block mb-1 text-gray-500 font-medium text-sm mt-3">Descripción <span className="text-red-500">*</span></label>
                        {/* <TextArea {...field} rows={4} placeholder="Descripción del producto" required /> */}
                        <EditorTextArea value={field.value} onChange={field.onChange} />
                    </>
                )}
            />
        </div>
    )
}

export default NombreDescripcionSection
