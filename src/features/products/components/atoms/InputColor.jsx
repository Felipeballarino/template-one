import { Input } from "antd"

const InputColor = ({ nuevaVariante, setNuevaVariante }) => {
    return (
        // Campo seleccionar color y nombre de color
        <div className='flex flex-col gap-1'>
            <label className="font-medium">Color <span className="text-red-500">*</span></label>
            <div className='flex gap-3'>
                <input type="color" value={nuevaVariante.color} onChange={(e) => setNuevaVariante({ ...nuevaVariante, color: e.target.value })} className="w-10 h-10 rounded border" />
                <Input placeholder="Color" value={nuevaVariante.nombreColor} onChange={(e) => setNuevaVariante({ ...nuevaVariante, nombreColor: e.target.value })} />
            </div>
        </div>
    )
}

export default InputColor
