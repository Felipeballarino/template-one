import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { formatearPrecio } from "../../../utils/helpers"

export const productColumns = (navigate, deleteProd) => [
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
    },
    {
        title: 'Precio',
        key: 'precio',
        render: (_, record) => (
            <p>{formatearPrecio(record.precio)}</p>
        ),
    },
    {
        title: 'Descuento (%)',
        key: 'porcentajeDescuento',
        render: (_, record) => (
            <p>{record.porcentajeDescuento > 0 ? `${record.porcentajeDescuento} %` : `-`}</p>
        ),
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
