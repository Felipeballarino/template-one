import InputColor from "../atoms/InputColor"
import InputStock from "../atoms/InputStock"

const VarianteColorInput = ({ nuevaVarianteColor, setNuevaVarianteColor, onchange }) => {
    return (
        <div className="mt-3 flex items-end gap-3 flex-wrap">
            <InputColor
                nuevaVariante={nuevaVarianteColor}
                setNuevaVariante={setNuevaVarianteColor}
            />
            <InputStock
                nuevaVariante={nuevaVarianteColor}
                setNuevaVariante={setNuevaVarianteColor}
                onchange={onchange} />
        </div>
    )
}

export default VarianteColorInput
