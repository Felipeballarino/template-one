import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space } from "antd";

export const categoriesColumns = (navigate, deleteCateg) => [
    {
        title: 'Id',
        key: 'id',
        dataIndex: 'id',
    },
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
        title: 'Acciones',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <button onClick={() => navigate(`/admin/editar-categoria/${record.id}`)} className="cursor-pointer text-xl text-blue-800"><EditOutlined /></button>
                <button onClick={() => deleteCateg(record.id)} className="cursor-pointer text-xl text-red-800"><DeleteOutlined /></button>
            </Space>
        ),
    },
];