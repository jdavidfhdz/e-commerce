import React from "react";
import PropTypes from 'prop-types';
import { Table } from "antd";

const TableComponent = ({ columns, dataSource, pagination }) => {

    return(
        <Table
            columns={columns}
            dataSource={dataSource}
            pagination={pagination}
         />
    )
}

TableComponent.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    pagination: PropTypes.object.isRequired,
};

export default TableComponent;