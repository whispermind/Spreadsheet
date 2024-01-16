import { useMemo } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SortAlphaDown, Filter } from "react-bootstrap-icons";

import { useGetAccountsQuery } from "../../api/accounts"
import { PaginationBar } from "../../components/PaginationBar";
import { usePagination } from "../../hooks";
import "./index.css"

export const AccountsPage = () => {
  const { page, setPage, perPage } = usePagination();
  const { data, isSuccess } = useGetAccountsQuery({ page: page, perPage });
  const navigate = useNavigate();

  const tableData = data?.apiResponse;

  const headings = useMemo(
    () => tableData?.length && Object.keys(tableData[0])
      .map((heading, index) => <th key={index}>{heading}<div className="table-controls"><Filter /><SortAlphaDown/></div></th>),
    [tableData]);

  const rows = useMemo(() => tableData?.map((rowData) => {
    const values = Object.values(rowData).map((cellData, index) => <td key={index}>{cellData}</td>);
    const clickHandler = () => navigate(`/profiles/${rowData.id}`)

    return <tr onClick={clickHandler} key={rowData.id}>{values}</tr>
  }), [tableData, navigate])

  const isData = isSuccess && tableData?.length;
  const totalPages = Math.ceil((data?.totalCount || 0) / perPage)

  return (
    <>
      <h2>Accounts</h2>
      {isData && <><Table striped bordered hover responsive className="app-table">
        <thead>
          <tr>
            {headings}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
        <PaginationBar onChange={setPage} currentPage={page} totalPages={totalPages} />
      </>
      }
    </>
  )
}

