import { Checkbox } from "antd"

const FiltrosCatalogos = ({
    marcas,
    categorias,
    marcaSeleccionada,
    setMarcaSeleccionada,
    categoriaSeleccionada,
    setCategoriaSeleccionada
}) => {

    const handleCategoriaChange = (checked, nombreCategoria) => {
        if (checked) {
            setCategoriaSeleccionada([...categoriaSeleccionada, nombreCategoria])
        } else {
            setCategoriaSeleccionada(categoriaSeleccionada.filter(c => c !== nombreCategoria))
        }
    }

    const handleMarcaChange = (checked, nombreMarca) => {
        if (checked) {
            setMarcaSeleccionada([...marcaSeleccionada, nombreMarca])
        } else {
            setMarcaSeleccionada(marcaSeleccionada.filter(m => m !== nombreMarca))
        }
    }
    return (
        <div className="flex flex-col gap-4 mb-6 col-span-2">
            <div className="border px-3 py-2 rounded">
                <h1 className="font-bold text-xl mb-2">Categorías</h1>
                <ul className="flex flex-col gap-1">
                    {categorias.map(cat => (
                        <Checkbox
                            key={cat.id}
                            checked={categoriaSeleccionada.includes(cat.nombre)}
                            onChange={(e) => handleCategoriaChange(e.target.checked, cat.nombre)}
                        >
                            {cat.nombre}
                        </Checkbox>
                    ))}
                </ul>
            </div>

            <div className="border px-3 py-2 rounded">
                <h1 className="font-bold text-xl mb-2">Marcas</h1>
                <ul className="flex flex-col gap-1">
                    {marcas.map(marca => (
                        <Checkbox
                            key={marca.id}
                            checked={marcaSeleccionada.includes(marca.nombre)}
                            onChange={(e) => handleMarcaChange(e.target.checked, marca.nombre)}
                        >
                            {marca.nombre}
                        </Checkbox>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default FiltrosCatalogos
