
import { useParams } from "react-router-dom";

import { useGetProfilesQuery } from "../../api/profiles";
import { PaginationBar, AppTable } from "../../components";
import { useTableContext } from "../../components/AppTable/TableContext";

export const ProfilesPage = () => {
  const { accountId } = useParams();
  const { page, perPage, sortingBy, sortingOrd, filteringField, filteringSubject } = useTableContext();
  const { data, isSuccess } = useGetProfilesQuery({page, perPage, sortingBy, sortingOrd, filteringField, filteringSubject, accountId: accountId! });
  const tableData = data?.apiResponse;
  const isData = isSuccess && tableData?.length;
  const totalPages = Math.ceil((data?.totalCount || 0) / perPage)

  return (
    <>
      <h2>Profiles</h2>
      {
      isData ?
        <>
          <AppTable redirect="campaigns" tableData={tableData}  />
          <PaginationBar totalPages={totalPages} />
        </> : isSuccess && <h2>There is no data for current request</h2>
      }
    </>
  )
}

