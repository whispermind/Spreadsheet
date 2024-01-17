import { createContext, useContext } from 'react';

export interface ITableContext extends IDataRequestOptions {
  setDefault: () => void, 
  setContext: (context: ITableContext) => void
}

export const defaultTableContextValue: ITableContext = {
    sortingBy: "id",
    sortingOrd: "asc",
    filteringField: "",
    filteringSubject: "",
    page: 1,
    perPage: 10,
    setDefault: () => {},
    setContext: () => {}
}

export const TableContext = createContext(defaultTableContextValue);
export const useTableContext = () => {
  const context = useContext(TableContext);
  if(!context) {throw new Error("There is no context")}
  
  return context;
};