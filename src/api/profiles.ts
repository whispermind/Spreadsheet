import { apiSlice } from ".";

interface IProfile {
  id: string;
  country: string;
  marketplace: string;
}

const articleApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProfiles: builder.query<IProfile[], Partial<IDataRequestOptions> & { id: string }>({
			query: ({page, perPage, id}) => ({
				url: `/profiles?_page=${page}&per_page=${perPage}&id=${id}`
			}),
			providesTags: ["profiles"],
		}),
})});

export const {
  useGetProfilesQuery
} = articleApi;
