import { apiSlice } from ".";

interface IProfile {
  id: string;
  country: string;
  marketplace: string;
}

const articleApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProfiles: builder.query<{apiResponse: IProfile[], totalCount: number}, Partial<IDataRequestOptions> & { accountId: string }>({
			query: ({page, perPage, sortingBy, sortingOrd, filteringSubject, filteringField, accountId}) => ({
				url: `/profiles?_page=${page}&_per_page=${perPage}&_sort=${sortingBy}&_order=${sortingOrd}&id=${accountId}&${filteringSubject && filteringField || ""}=${filteringSubject}`
			}),
			transformResponse(apiResponse: IProfile[], meta) {
        return { apiResponse, totalCount: Number(meta?.response?.headers.get('X-Total-Count')) }
      },
			providesTags: ["profiles"],
		}),
})});

export const {
  useGetProfilesQuery
} = articleApi;
