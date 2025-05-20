import { Button, Input, InputNumber, Select } from "antd";

const VarianteTalleForm = ({ variantesTalle, setVariantesTalle, nuevaVarianteTalle, setNuevaVarianteTalle, nuevoTalle, setNuevoTalle, talles }) => {
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
            <div className="flex flex-col gap-1 flex-wrap">
                <label className="font-medium">Color<span className="text-red-500">*</span></label>
                <div className='flex gap-3'>
                    <input type="color" value={nuevaVarianteTalle.color} onChange={(e) => setNuevaVarianteTalle({ ...nuevaVarianteTalle, color: e.target.value })} className="w-10 h-10 rounded border" />
                    <Input placeholder="Nombre del color" value={nuevaVarianteTalle.nombreColor} onChange={(e) => setNuevaVarianteTalle({ ...nuevaVarianteTalle, nombreColor: e.target.value })} />
                </div>
            </div>

            <div className="mt-3 flex items-end gap-3 flex-wrap">
                <div className='flex flex-col gap-1'>
                    <label className="font-medium">Talle <span className="text-red-500">*</span></label>
                    <Select placeholder="Talle" defaultValue={0} value={nuevoTalle.talle} onChange={(value) => setNuevoTalle({ ...nuevoTalle, talle: value })} options={talles} style={{ width: 100 }} />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className="font-medium">Stock <span className="text-red-500">*</span></label>
                    <InputNumber placeholder="Stock" min={0} value={nuevoTalle.stock} onChange={(value) => setNuevoTalle({ ...nuevoTalle, stock: value })} />
                </div>
                <Button type="dashed" onClick={agregarTalle}>Agregar</Button>
            </div>

            {/* Lista de talles */}
            {nuevaVarianteTalle.talles.length > 0 && (
                <div className="mt-2 space-y-1">
                    {nuevaVarianteTalle.talles.map((t, i) => (
                        <div key={i} className="flex justify-between items-center">
                            <span>{t.talle} - Stock: {t.stock}</span>
                            <Button size="small" danger onClick={() => eliminarTalle(i)}>Eliminar</Button>
                        </div>
                    ))}
                </div>
            )}

            <Button type="primary" className="mt-3" onClick={agregarVarianteTalle}>Agregar Variante</Button>

            {/* Lista de variantes */}
            {variantesTalle.length > 0 && (
                <div className="mt-4 space-y-2">
                    {variantesTalle.map((v, i) => (
                        <div key={i} className="border px-3 py-2 rounded">
                            <div>{v.nombreColor}</div>
                            <div className="text-sm text-gray-500">
                                <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: v.color }}></span>
                                {v.talles.map(t => `${t.talle} (${t.stock})`).join(', ')}
                            </div>
                            <Button danger onClick={() => eliminarVarianteTalle(i)} className="mt-2">Eliminar</Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default VarianteTalleForm