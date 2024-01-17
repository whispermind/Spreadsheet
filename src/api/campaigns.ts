import { apiSlice } from ".";

interface ICampaign {
  id: string;
  clicks: number;
  cost: string;
  date: string
}

const campaignsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCampaigns: builder.query<{ apiResponse: ICampaign[], totalCount: number }, Partial<IDataRequestOptions> & {profileId: string}>({
			query: ({page, perPage, sortingBy, sortingOrd, filteringField, filteringSubject, profileId}) => ({
				url: `/campaigns?_page=${page}&_per_page=${perPage}&_sort=${sortingBy}&_order=${sortingOrd}&id=${profileId}&${filteringSubject && filteringField || ""}=${filteringSubject}`
			}),
			transformResponse(apiResponse: ICampaign[], meta) {
				return { apiResponse, totalCount: Number(meta?.response?.headers.get('X-Total-Count')) }
			},
			providesTags: ["campaigns"],
		})
})});

export const {
  useGetCampaignsQuery
} = campaignsApi;
