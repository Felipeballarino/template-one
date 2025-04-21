import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { formatearPrecio } from "../../utils/utils"

export const productColumns = (navigate, deleteProd) => [
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
    },
    {
        title: 'Descripcion',
        dataIndex: 'descripcion',
        key: 'descripcion',
    },
    {
        title: 'Precio',
        key: 'precio',
        render: (_, record) => (
            <p>{formatearPrecio(record.precio)}</p>
        ),
    },
    {
        title: 'Stock',
        dataIndex: 'stock',
        key: 'stock',
    },
    {
        title: 'Acciones',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <button onClick={() => navigate(`/admin/editar-producto/${record.id}`)} className="cursor-pointer text-xl text-blue-800"><EditOutlined /></button>
                <button onClick={() => deleteProd(record.id)} className="cursor-pointer text-xl text-red-800"><DeleteOutlined /></button>
            </Space>
        ),
    },
];
