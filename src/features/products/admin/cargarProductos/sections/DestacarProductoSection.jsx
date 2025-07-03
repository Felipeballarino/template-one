import { Checkbox } from "antd"
import { Controller } from "react-hook-form"

const DestacarProductoSection = ({ control }) => {
    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className='font-bold text-2xl mb-2'>Destacar producto</h2>
            <Controller
                name="isDestacado"
                control={control}
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                    <>
                        <Checkbox
                            checked={value}
                            onChange={e => {
                                const isChecked = e.target.checked
                                onChange(isChecked)
                            }}
                            className="block mb-8 font-medium w-full"
                        >
                            Destacados
                        </Checkbox>
                    </>
                )}
            />
            <Controller
                name="isNovedad"
                control={control}
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                    <>
                        <Checkbox
                            checked={value}
                            onChange={e => {
                                const isChecked = e.target.checked
                                onChange(isChecked)
                            }}
                            className="block mb-8 font-medium w-full"
                        >
                            Novedades
                        </Checkbox>
                    </>
                )}
            />
            <Controller
                name="isOferta"
                control={control}
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                    <>
                        <Checkbox
                            checked={value}
                            onChange={e => {
                                const isChecked = e.target.checked
                                onChange(isChecked)
                            }}
                            className="block mb-8 font-medium w-full"
                        >
                            Ofertas
                        </Checkbox>
                    </>
                )}
            />
        </div>
    )
}

export default DestacarProductoSection
