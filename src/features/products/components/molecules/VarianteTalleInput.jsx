import { Button, Select } from "antd"
import InputColor from "../atoms/InputColor"
import InputStock from "../atoms/InputStock"
import { talles } from "../../../../constants/enums"
import TalleItem from "../atoms/TalleItem"

const VarianteTalleInput = ({
    nuevaVarianteTalle,
    setNuevaVarianteTalle,
    nuevoTalle,
    setNuevoTalle,
    onchange,
    onDelete,
    addTalle
}) => {
    return (
        <>
            {/* selecciona color */}
            <InputColor
                nuevaVariante={nuevaVarianteTalle}
                setNuevaVariante={setNuevaVarianteTalle}
            />
            {/* selecciona talle y stock */}
            <div className="mt-3 flex items-end gap-3 flex-wrap">
                <div className='flex flex-col gap-1'>
                    <label className="font-medium">Talle <span className="text-red-500">*</span></label>
                    <Select placeholder="Talle" defaultValue={0} value={nuevoTalle.talle} onChange={(value) => setNuevoTalle({ ...nuevoTalle, talle: value })} options={talles} style={{ width: 100 }} />
                </div>
                <InputStock
                    nuevaVariante={nuevoTalle}
                    setNuevaVariante={setNuevoTalle}
                    onchange={onchange}
                />
            </div>
            {/* Lista de talles */}
            {nuevaVarianteTalle.talles.length > 0 && (
                <div className="mt-2 space-y-1">
                    {nuevaVarianteTalle.talles.map((t, i) => (
                        <TalleItem key={i} talle={t} index={i} onDelete={onDelete} />
                    ))}
                </div>
            )}
            <Button type="primary" className="mt-3" onClick={addTalle}>Agregar Variante</Button>
        </>
    )
}

export default VarianteTalleInput
