import { useMemo } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useGetAccountsQuery } from "../../api/accounts"

export const AccountsPage = () => {
  const { data, isSuccess } = useGetAccountsQuery({ page: 1 });
  const navigate = useNavigate();

  const tableData = data?.apiResponse;

  const headings = useMemo(
    () => tableData?.length && Object.keys(tableData[0])
      .map((heading, index) => <th key={index}>{heading}</th>),
    [tableData]);

  const rows = useMemo(() => tableData?.map((rowData) => {
    const values = Object.values(rowData).map((cellData, index) => <td key={index}>{cellData}</td>);
    const clickHandler = () => navigate(`/profiles/${rowData.id}`) 

    return <tr onClick={clickHandler} key={rowData.id}>{values}</tr>
  }), [tableData, navigate])

  const isData = isSuccess && tableData?.length;
  
  return (
    isData && <Table striped bordered hover responsive className="app-table">
      <thead>
        <tr>
          {headings}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
  )
}

