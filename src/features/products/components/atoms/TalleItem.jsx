import { Button } from "antd";

const TalleItem = ({ talle, index, onDelete }) => (
    <div className="flex justify-between items-center">
        <span>{talle.talle} - Stock: {talle.stock}</span>
        <Button size="small" danger onClick={() => onDelete(index)}>Eliminar</Button>
    </div>
);

export default TalleItem;