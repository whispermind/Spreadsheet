import Pagination from 'react-bootstrap/Pagination';

import { useTableContext } from '../AppTable/TableContext';
import "./index.css";

interface IPaginationBarProps {
  totalPages: number;
}

export const PaginationBar = ({ totalPages }: IPaginationBarProps) => {
  const context = useTableContext();
  const { page, setContext } = context;
  const items = [];

  const setNext = () => {
    if (page === totalPages) return
    setContext({ ...context, page: page + 1 });
  };
  const setPrev = () => {
    if (page === 1) return
    setContext({ ...context, page: page - 1 })
  }
  const starter = page > 1 ? page - 1 : page;

  for (let i = starter; i <= totalPages; i++) {
    if (starter >= 10 && !items.length) {
      items.push(
        <Pagination.Item key={1} onClick={() => setContext({ ...context, page: 1 })} active={page === 1}>{1}</Pagination.Item>,
        <Pagination.Item key={2} onClick={() => setContext({ ...context, page: 2 })} active={page === 2}>{2}</Pagination.Item>,
        <Pagination.Ellipsis key={"startElipsis"} />
      )
    }

    if (totalPages - starter > 6 && items.length >= 6) {
      items.push(
        <Pagination.Ellipsis key={"endElipsis"} />,
        <Pagination.Item key={totalPages - 1} onClick={() => setContext({ ...context, page: totalPages - 1 })} active={page === totalPages - 1}>{totalPages - 1}</Pagination.Item>,
        <Pagination.Item key={totalPages} onClick={() => setContext({ ...context, page: totalPages })} active={page === totalPages}>{totalPages}</Pagination.Item>,
      );
      break;
    }

    items.push(<Pagination.Item key={i} onClick={() => setContext({ ...context, page: i })}
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