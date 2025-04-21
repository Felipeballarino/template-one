export const userColumns = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Usuario',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Rol',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Dirección',
        key: 'address',
        render: (_, record) => {
            const { street, suite, city, zipcode } = record.address || {};
            return `${street}, ${suite}, ${city} (${zipcode})`;
        },
    },
    {
        title: 'Teléfono',
        dataIndex: 'phone',
        key: 'phone',
    }
];