import { Select } from "antd"
import { Controller } from "react-hook-form"

const CategoriaMarcaSection = ({ control, columCategorias, columMarcas }) => {
    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className='font-bold text-2xl mb-2'>Categoria y Marca</h2>
            <div className='flex gap-4'>
                <Controller
                    name="categoriaId"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <div className='w-1/2'>
                            <label className="block mb-1 text-gray-500 font-medium text-sm">Categoría <span className="text-red-500">*</span></label>
                            <Select {...field} className='w-full' options={columCategorias} required />
                        </div>
                    )}
                />
                <Controller
                    name="marcaId"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <div className='w-1/2'>
                            <label className="block mb-1 text-gray-500 font-medium text-sm">Marca <span className="text-red-500">*</span></label>
                            <Select {...field} className='w-full' options={columMarcas} required />
                        </div>
                    )}
                />
            </div>
        </div>
    )
}

export default CategoriaMarcaSection
