import VarianteColorInput from "../molecules/VarianteColorInput";
import VarianteList from "../molecules/VarianteList";

const VarianteColorForm = ({ variantesColor, setVariantesColor, nuevaVarianteColor, setNuevaVarianteColor }) => {

    const agregarVariante = () => {
        const { color, nombreColor, stock } = nuevaVarianteColor;
        if (!nombreColor || !color || stock <= 0) return alert('Completá todos los campos de la variante');

        setVariantesColor([...variantesColor, nuevaVarianteColor]);
        setNuevaVarianteColor({ color: '#000000', nombreColor: '', stock: 0 });
    };

    const eliminarVariante = (index) => {
        setVariantesColor(variantesColor.filter((_, i) => i !== index));
    };

    return (
        <div className='mt-6'>
            {/* agregar variantes color */}
            <VarianteColorInput
                nuevaVarianteColor={nuevaVarianteColor}
                setNuevaVarianteColor={setNuevaVarianteColor}
                onchange={agregarVariante}
            />
            {/* Lista de variantes color */}
            <VarianteList
                variantes={variantesColor}
                onEliminar={eliminarVariante}
            />
        </div>
    );
};
export default VarianteColorForm