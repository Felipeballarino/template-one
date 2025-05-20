import { Table } from 'antd'

const Tables = ({ data, columns }) => {
    return (
        <Table dataSource={data} columns={columns} />
    )
}

export default Tables
