import { Table } from 'antd'
import React from 'react'

const Tables = ({ data, columns }) => {
    return (
        <Table dataSource={data} columns={columns} />
    )
}

export default Tables
