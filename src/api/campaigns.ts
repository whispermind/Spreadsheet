import { apiSlice } from ".";

interface ICampaign {
  id: string;
  clicks: number;
  cost: string;
  date: string
}

const campaignsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCampaigns: builder.query<ICampaign[], Partial<IDataRequestOptions> & {id: string}>({
			query: ({page, perPage, id}) => ({
				url: `/campaign?_page=${page}&per_page=${perPage}&id=${id}`
			}),
			providesTags: ["campaigns"],
		}),
})});

export const {
  useGetCampaignsQuery
} = campaignsApi;
