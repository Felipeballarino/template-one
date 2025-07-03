import { VarianteCard } from "../atoms/VariantesCard"

const VarianteList = ({ variantes, onEliminar }) => {
    return (
        <>
            {/* Lista de variantes */}
            {variantes.length >
                0 && (
                    <div className="mt-4 space-y-2">
                        {variantes.map((v, i) => (
                            <VarianteCard key={i} variante={v} onDelete={() => onEliminar(i)} />
                        ))}
                    </div>
                )}

        </>
    )
}

export default VarianteList
