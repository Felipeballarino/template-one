import HeaderTable from "./HeaderTable"
import Tables from "./Tables"

const TableComponent = ({ name, link, data, columns, loading }) => {
    return (
        <div>
            <HeaderTable name={name} url={link} />
            <Tables data={data} columns={columns} loading={loading} />
        </div>
    )
}

export default TableComponent
