import { Button, InputNumber } from 'antd'

const InputStock = ({ nuevaVariante, setNuevaVariante, onchange }) => {
    return (
        // Campo cargar stocks
        <>
            <div className='flex flex-col gap-1'>
                <label className="font-medium">Stock <span className="text-red-500">*</span></label>
                <InputNumber min={0} value={nuevaVariante.stock} onChange={(value) => setNuevaVariante({ ...nuevaVariante, stock: value })} />
            </div>
            <Button type="dashed" onClick={onchange}>Agregar Variante</Button>
        </>
    )
}

export default InputStock
