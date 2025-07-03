import { Button } from "antd";

export const VarianteCard = ({ variante, onDelete }) => {
  return (
    <div className="border px-3 py-2 rounded">
      <div>{variante.nombreColor}</div>
      <div className="text-sm text-gray-500 flex items-center">
        <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: variante.color }}></span>
        {variante.talles ?
          variante.talles.map(t => `${t.talle} (${t.stock})`).join(', ')
          :
          <div className="text-sm text-gray-500">
            Stock: {variante.stock}
          </div>
        }
      </div>
      <Button danger onClick={onDelete} className="mt-2">Eliminar</Button>
    </div>
  )
};