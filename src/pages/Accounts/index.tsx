import { useGetAccountsQuery } from "../../api/accounts"
import { PaginationBar, AppTable } from "../../components";
import { useTableContext } from "../../components/AppTable/TableContext";

export const AccountsPage = () => {
  const { page, perPage, sortingBy, sortingOrd, filteringField, filteringSubject } = useTableContext();
  const { data, isSuccess } = useGetAccountsQuery({page, perPage, sortingBy, sortingOrd, filteringField, filteringSubject});
  const tableData = data?.apiResponse;
  const isData = isSuccess && tableData?.length;
  const totalPages = Math.ceil((data?.totalCount || 0) / perPage)

  return (
    <>
      <h2>Accounts</h2>
      {
      isData ?
        <>
          <AppTable redirect="profiles" tableData={tableData}  />
          <PaginationBar totalPages={totalPages} />
        </> : isSuccess && <h2>There is no data for current request</h2>
      }
    </>
  )
}

