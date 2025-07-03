import { Input } from 'antd';
import CheckBoxList from "../molecules/CheckBoxList";
import { useBrandsStore } from '../../../../store/brandsStore';
import { useCategoriesStore } from '../../../../store/categoriesStore';
const { Search } = Input;

const FiltrosCatalogos = ({
    marcaSeleccionada,
    setMarcaSeleccionada,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    onSearch
}) => {
    const { categories } = useCategoriesStore();
    const { brands } = useBrandsStore()


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
            <div>
                <Search
                    placeholder="Buscar productos"
                    onSearch={onSearch}
                    className="w-full custom-search"
                    size="large" />
            </div>
            <CheckBoxList
                name={"Categorías"}
                data={categories}
                seleccionados={categoriaSeleccionada}
                onChange={handleCategoriaChange}
            />
            <CheckBoxList
                name={"Marcas"}
                data={brands}
                seleccionados={marcaSeleccionada}
                onChange={handleMarcaChange}
            />
        </div>
    )
}

export default FiltrosCatalogos
