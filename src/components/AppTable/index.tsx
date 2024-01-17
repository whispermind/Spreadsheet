import { useMemo, useCallback, MouseEvent } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SortAlphaDown, Filter } from "react-bootstrap-icons";

import { useTableContext } from "./TableContext";
import "./index.css"

interface IAppTableProps {
  tableData: object & { id: string }[],
  redirect?: string;
}

export const AppTable = ({ tableData, redirect }: IAppTableProps) => {
  const navigate = useNavigate();
  const context = useTableContext();
  
  const sortByField = useCallback(({ currentTarget }: MouseEvent) => {
    const field = (currentTarget as HTMLElement).dataset.field!;
    const { setContext, sortingBy, sortingOrd } = context;
    const updatedContext = {...context};

    if(field === sortingBy) {
      updatedContext.sortingOrd = sortingOrd === "asc" ? "desc" : "asc";
    }
    else {
      updatedContext.sortingBy = field;
      updatedContext.sortingOrd = "asc";
    }

    setContext(updatedContext);
  }, [context]);

  const headings = useMemo(
    () => tableData?.length && Object.keys(tableData[0])
      .map((heading, index) => <th key={index}>{heading}<div className="table-controls"><button data-field={heading}><Filter /></button><button onClick={sortByField} data-field={heading} ><SortAlphaDown /></button></div></th>),
    [tableData, sortByField]);

  const rows = useMemo(() => tableData?.map((rowData) => {
    const values = Object.values(rowData).map((cellData, index) => <td key={index}>{cellData}</td>);
    const clickHandler = () => { 
      if(redirect) {
        navigate(`/${redirect}/${rowData.id}`);
        context.setDefault()
      } 
    }

    return <tr onClick={clickHandler} key={rowData.id}>{values}</tr>
  }), [context, tableData, navigate, redirect])
  

  return (
    <>
      <Table striped bordered hover responsive className="app-table">
        <thead>
          <tr>
            {headings}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </>
  )
}

