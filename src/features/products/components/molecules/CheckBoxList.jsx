import { Checkbox } from "antd"

const CheckBoxList = ({ data, name, onChange, seleccionados }) => {
    return (
        // Checkbox filtros catalogos
        <div className="border px-3 py-2 rounded">
            <h1 className="font-bold text-xl mb-2">{name}</h1>
            <ul className="flex flex-col gap-1">
                {data.map(opcion => (
                    <Checkbox
                        key={opcion.id}
                        checked={seleccionados.includes(opcion.nombre)}
                        onChange={(e) => onChange(e.target.checked, opcion.nombre)}
                    >
                        {opcion.nombre}
                    </Checkbox>
                ))}
            </ul>
        </div>
    )
}

export default CheckBoxList
