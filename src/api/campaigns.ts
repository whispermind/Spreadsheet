import { apiSlice } from ".";

interface ICampaign {
  id: string;
  clicks: number;
  cost: string;
  date: string
}

const campaignsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		addCampaign: builder.mutation<void, ICampaign>({
			query: (reqBody) => ({
				url: "/campaign",
				method: "POST",
				body: reqBody
			}),
			invalidatesTags: ["campaigns"]
		}),
		getCampaigns: builder.query<ICampaign[], Partial<IPagination> & {id: string}>({
			query: ({page, perPage, id}) => ({
				url: `/campaign?_page=${page}&per_page=${perPage}&id=${id}`
			}),
			providesTags: ["campaigns"],
		}),
})});

export const {
	useAddCampaignMutation,
  useGetCampaignsQuery
} = campaignsApi;
