
import { useParams } from "react-router-dom";

import { useGetCampaignsQuery } from "../../api/campaigns";
import { PaginationBar, AppTable } from "../../components";
import { useTableContext } from "../../components/AppTable/TableContext";

export const CampaignsPage = () => {
  const { profileId } = useParams();
  const { page, perPage, sortingBy, sortingOrd, filteringField, filteringSubject } = useTableContext();
  const { data, isSuccess } = useGetCampaignsQuery({page, perPage, sortingBy, sortingOrd, filteringField, filteringSubject, profileId: profileId! });
  const tableData = data?.apiResponse;
  const isData = isSuccess && tableData?.length;
  const totalPages = Math.ceil((data?.totalCount || 0) / perPage)

  return (
    <>
      <h2>Campaigns</h2>
      {
      isData ?
        <>
          <AppTable tableData={tableData}  />
          <PaginationBar totalPages={totalPages} />
        </> : isSuccess && <h2>There is no data for current request</h2>
      }
    </>
  )
}

