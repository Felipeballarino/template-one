import { Button, Input, InputNumber } from "antd";

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
            <div className="mt-3 flex items-end gap-3 flex-wrap">
                <div className='flex flex-col gap-1'>
                    <label className="font-medium">Color <span className="text-red-500">*</span></label>
                    <div className='flex gap-3'>
                        <input type="color" value={nuevaVarianteColor.color} onChange={(e) => setNuevaVarianteColor({ ...nuevaVarianteColor, color: e.target.value })} className="w-10 h-10 rounded border" />
                        <Input placeholder="Color" value={nuevaVarianteColor.nombreColor} onChange={(e) => setNuevaVarianteColor({ ...nuevaVarianteColor, nombreColor: e.target.value })} />
                    </div>

                </div>
                <div className='flex flex-col gap-1'>
                    <label className="font-medium">Stock <span className="text-red-500">*</span></label>
                    <InputNumber min={0} value={nuevaVarianteColor.stock} onChange={(value) => setNuevaVarianteColor({ ...nuevaVarianteColor, stock: value })} />
                </div>
                <Button type="dashed" onClick={agregarVariante}>Agregar Variante</Button>
            </div>
            {/* Lista de variantes */}
            {variantesColor.length > 0 && (
                <div className="mt-4 space-y-2">
                    {variantesColor.map((v, i) => (
                        <div key={i} className="border px-3 py-2 rounded">
                            <div>{v.nombreColor}</div>
                            <div className="text-sm text-gray-500">
                                <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: v.color }}></span>
                                Stock: {v.stock}
                            </div>
                            <Button danger onClick={() => eliminarVariante(i)} className="mt-2">Eliminar</Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default VarianteColorForm