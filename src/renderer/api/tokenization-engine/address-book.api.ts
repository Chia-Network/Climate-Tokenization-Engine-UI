import { Address } from '@/schemas/Address.schema';
import { addressBookTag, RECORDS_PER_PAGE, tokenizationEngineApi } from './index';

interface GetAddressBookParams {
  page?: number;
  search?: string | null;
  order?: string | null;
  limit?: number;
}

interface GetAddressBookResponse {
  page: number;
  pageCount: number;
  data: Address[];
}

interface GetAddressParams {
  id: string;
}

interface CreateAddressParams {
  name: string;
  walletAddress?: string;
}

const addressBookApi = tokenizationEngineApi.injectEndpoints({
  endpoints: (builder) => ({
    getAddressBook: builder.query<GetAddressBookResponse, GetAddressBookParams>({
      query: ({ page, search, order, limit }: GetAddressBookParams) => {
        const params: GetAddressBookParams = { page, limit: limit || RECORDS_PER_PAGE };

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

    getAddress: builder.query<Address, GetAddressParams>({
      query: ({ id }: GetAddressParams) => ({
        url: `/address-book`,
        params: { id },
        method: 'GET',
      }),
      providesTags: (_response, _error, { id }) => [{ type: addressBookTag, id: id }],
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

    deleteAddress: builder.mutation<any, { uuid: string }>({
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

    editAddress: builder.mutation<any, { id: string; name?: string; walletAddress?: string }>({
      query: (data) => {
        const body: any = {};
        if (data.id) body.id = data.id;
        if (data.name) body.name = data.name;
        if (data.walletAddress) body.walletAddress = data.walletAddress;
        return {
          url: `/address-book`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: [addressBookTag],
    }),
  }),
});

export const invalidateAddressBookApiTag = addressBookApi.util.invalidateTags;

export const {
  useCreateAddressMutation,
  useGetAddressQuery,
  useGetAddressBookQuery,
  useDeleteAddressMutation,
  useEditAddressMutation,
} = addressBookApi;
