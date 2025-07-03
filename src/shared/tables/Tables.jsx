import { Table } from 'antd'

const Tables = ({ data, columns, loading }) => {
    return (
        <Table dataSource={data} columns={columns} loading={loading} />
    )
}

export default Tables
