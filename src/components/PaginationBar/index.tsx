import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

import "./index.css";

interface IPaginationBarProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void
}

export const PaginationBar = ({ currentPage, totalPages, onChange }: IPaginationBarProps) => {
  const [page, setPage] = useState(currentPage);
  const items = [];

  const setNext = () => {
    if (page === totalPages) return
    setPage(page + 1)
    onChange(page + 1);
  };
  const setPrev = () => {
    if (page === 1) return
    setPage(page - 1);
    onChange(page - 1);
  }
  const starter = page > 1 ? page - 1 : page;

  for (let i = starter; i <= totalPages; i++) {
    if (starter >= 10 && !items.length) {
      items.push(
        <Pagination.Item key={1} onClick={() => {
          setPage(1)
          onChange(1);
        }}
          active={page === 1}>{1}</Pagination.Item>,
        <Pagination.Item key={2} onClick={() => {
          setPage(2)
          onChange(2);
        }} active={page === 2}>{2}</Pagination.Item>,
        <Pagination.Ellipsis key={"startElipsis"} />
      )
    }

    if (totalPages - starter > 6 && items.length >= 6) {
      items.push(
        <Pagination.Ellipsis key={"endElipsis"} />,
        <Pagination.Item key={totalPages - 1} onClick={() => {
          setPage(totalPages - 1)
          onChange(totalPages - 1)
        }} active={page === totalPages - 1}>{totalPages - 1}</Pagination.Item>,
        <Pagination.Item key={totalPages} onClick={() => {
          setPage(totalPages);
          onChange(totalPages);
        }} active={page === totalPages}>{totalPages}</Pagination.Item>,
      );
      break;
    }

    items.push(<Pagination.Item key={i} onClick={() => {
      setPage(i);
      onChange(i)
    }}
      active={page === i}>{i}
    </Pagination.Item>)
  }

  return (
    <Pagination className='app-pagination'>
      <Pagination.Prev onClick={setPrev} />
      {items}
      <Pagination.Next onClick={setNext} />
    </Pagination>
  );
}