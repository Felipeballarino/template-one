import VarianteTalleInput from "../molecules/VarianteTalleInput";
import VarianteList from "../molecules/VarianteList";

const VarianteTalleForm = ({ variantesTalle, setVariantesTalle, nuevaVarianteTalle, setNuevaVarianteTalle, nuevoTalle, setNuevoTalle }) => {
    const agregarTalle = () => {
        if (nuevoTalle.talle === null || nuevoTalle.stock < 0) return;
        setNuevaVarianteTalle({
            ...nuevaVarianteTalle,
            talles: [...nuevaVarianteTalle.talles, nuevoTalle]
        });
        setNuevoTalle({ talle: null, stock: 0 });
    };

    const eliminarTalle = (index) => {
        setNuevaVarianteTalle({
            ...nuevaVarianteTalle,
            talles: nuevaVarianteTalle.talles.filter((_, i) => i !== index)
        });
    };

    const agregarVarianteTalle = () => {
        const { color, nombreColor, talles } = nuevaVarianteTalle;
        if (!nombreColor || !color || talles.length === 0) return alert('Completá todos los campos');

        setVariantesTalle([...variantesTalle, nuevaVarianteTalle]);
        setNuevaVarianteTalle({ color: '#000000', nombreColor: '', talles: [] });
    };

    const eliminarVarianteTalle = (index) => {
        setVariantesTalle(variantesTalle.filter((_, i) => i !== index));
    };

    return (
        <div className="mt-6">
            {/* Agrega variantes talles */}
            <VarianteTalleInput
                nuevaVarianteTalle={nuevaVarianteTalle}
                setNuevaVarianteTalle={setNuevaVarianteTalle}
                nuevoTalle={nuevoTalle}
                setNuevoTalle={setNuevoTalle}
                onchange={agregarTalle}
                onDelete={eliminarTalle}
                addTalle={agregarVarianteTalle}

            />
            {/* Lista de variantes talles */}
            <VarianteList
                variantes={variantesTalle}
                onEliminar={eliminarVarianteTalle}
            />

        </div>
    );
};
export default VarianteTalleForm