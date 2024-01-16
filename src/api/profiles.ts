import { apiSlice } from ".";

interface IProfile {
  id: string;
  country: string;
  marketplace: string;
}

const articleApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		addProfile: builder.mutation<void, IProfile>({
			query: (reqBody) => ({
				url: "/profiles",
				method: "POST",
				body: reqBody
			}),
			invalidatesTags: ["profiles"]
		}),
		getProfiles: builder.query<IProfile[], Partial<IPagination> & { id: string }>({
			query: ({page, perPage, id}) => ({
				url: `/profiles?_page=${page}&per_page=${perPage}&id=${id}`
			}),
			providesTags: ["profiles"],
		}),
})});

export const {
	useAddProfileMutation,
  useGetProfilesQuery
} = articleApi;
