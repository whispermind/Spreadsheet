import { useMemo, useCallback, MouseEvent, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SortAlphaDown, Filter, X } from "react-bootstrap-icons";
import { FilteringModal } from "..";

import { useTableContext } from "./TableContext";
import "./index.css"

interface IAppTableProps {
  tableData: object & { id: string }[],
  redirect?: string;
}

interface IModalState {
  show: boolean;
  filteringField: string;
}

const modalDefaultState = {show: false, filteringField: ""};

export const AppTable = ({ tableData, redirect }: IAppTableProps) => {
  const [modalState, setModalState] = useState<IModalState>(modalDefaultState);
  const navigate = useNavigate();
  const context = useTableContext();
  

  const handleClose = useCallback(() => setModalState(modalDefaultState), []);
  const handleShow = useCallback(({ currentTarget }: MouseEvent) => {
    const filteringField = (currentTarget as HTMLElement).dataset.field!;
    setModalState({show: true, filteringField })
  }, []);  
  
  const handleConfirm = useCallback((filteringSubject: string) => {
    context.setContext({...context, filteringSubject, filteringField: modalState.filteringField })
  }, [context, modalState.filteringField]);

  const cleanFiltering = useCallback(() => {
    context.setContext({...context, filteringField: "", filteringSubject: ""})
  }, [context]);

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
      .map((heading, index) => 
      <th key={index}>
        {heading}
        <div className="table-controls">
          <button title="Filtering" onClick={handleShow} data-field={heading}><Filter /></button>
          <button title="Clean filtering" onClick={cleanFiltering}><X /></button>
          <button title="Sorting" onClick={sortByField} data-field={heading} ><SortAlphaDown /></button>
        </div>
      </th>),
    [tableData, sortByField, handleShow]);

  const rows = useMemo(() => tableData?.map((rowData) => {
    const values = Object.values(rowData).map((cellData, index) => <td key={index}>{cellData}</td>);
    const clickHandler = () => { 
      if(redirect) {
        navigate(`/${redirect}/${rowData.id}`);
        context.setDefault()
      } 
    }

    return <tr onClick={clickHandler} key={rowData.id}>{values}</tr>
  }), [context, tableData, navigate, redirect]);

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
      <FilteringModal handleClose={handleClose} handleConfirm={handleConfirm} show={modalState.show} />
    </>
  )
}

