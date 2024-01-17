import { apiSlice } from ".";

interface IAccount {
  id: string;
  email: string;
  authToken: string;
  creationDate: string;
}

const accountsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		addAccount: builder.mutation<void, IAccount>({
			query: (reqBody) => ({
				url: "/accounts",
				method: "POST",
				body: reqBody
			}),
			invalidatesTags: ["accounts"]
		}),
		getAccounts: builder.query<{apiResponse: IAccount[], totalCount: number}, Partial<IDataRequestOptions>>({
			query: ({page, perPage, sortingOrd, sortingBy, filteringSubject, filteringField}) => ({
				url: `/accounts?_page=${page}&_per_page=${perPage}&_sort=${sortingBy}&_order=${sortingOrd}&${filteringField}=${filteringSubject}`
			}),
			transformResponse(apiResponse: IAccount[], meta) {
        return { apiResponse, totalCount: Number(meta?.response?.headers.get('X-Total-Count')) }
      },
			providesTags: ["accounts"],
		}),
})});

export const {
	useGetAccountsQuery,
  useAddAccountMutation
} = accountsApi;
