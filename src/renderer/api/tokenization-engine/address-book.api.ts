import { addressBookTag, RECORDS_PER_PAGE, tokenizationEngineApi } from './index';

interface Address {
  id: string;
  name: string;
  walletAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateAddressParams {
  name: string;
  walletAddress?: string;
}

interface GetAddressBookParams {
  page?: number;
  search?: string | null;
  order?: string | null;
}

interface GetAddressBookResponse {
  page: number;
  pageCount: number;
  data: Address[];
}

const addressBookApi = tokenizationEngineApi.injectEndpoints({
  endpoints: (builder) => ({
    getAddressBook: builder.query<GetAddressBookResponse, GetAddressBookParams>({
      query: ({ page, search, order }: GetAddressBookParams) => {
        const params: GetAddressBookParams & { limit: number } = { page, limit: RECORDS_PER_PAGE };

        if (search) {
          params.search = search.replace(/[^a-zA-Z0-9 _.-]+/, '');
        }

        if (order) {
          params.order = order;
        }

        return {
          url: `/address-book`,
          params,
          method: 'GET',
        };
      },
      providesTags: [addressBookTag],
    }),

    createAddress: builder.mutation<any, CreateAddressParams>({
      query: (createAddressParams: CreateAddressParams) => ({
        url: '/address-book',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: createAddressParams,
      }),
      invalidatesTags: [addressBookTag],
    }),

    deleteAddressBookItem: builder.mutation<any, { uuid: string }>({
      query: ({ uuid }) => {
        return {
          url: `/address-book`,
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: { id: uuid },
        };
      },
      invalidatesTags: [addressBookTag],
    }),
  }),
});

export const invalidateAddressBookApiTag = addressBookApi.util.invalidateTags;

export const { useCreateAddressMutation, useGetAddressBookQuery, useDeleteAddressBookItemMutation } = addressBookApi;
