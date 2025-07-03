import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space } from "antd";

export const marcasColumns = (navigate, deleteMarca) => [
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
        title: 'Acciones',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <button onClick={() => navigate(`/admin/editar-marca/${record.id}`)} className="cursor-pointer text-xl text-blue-800"><EditOutlined /></button>
                <button onClick={() => deleteMarca(record.id)} className="cursor-pointer text-xl text-red-800"><DeleteOutlined /></button>
            </Space>
        ),
    },
];