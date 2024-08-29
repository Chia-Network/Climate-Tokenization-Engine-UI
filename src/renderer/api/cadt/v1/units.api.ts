import {
  cadtApi,
  projectsByIdsTag,
  projectsTag,
  RECORDS_PER_PAGE,
  tokenizedUnitsTag,
  untokenizedUnitsTag,
} from './index';
import { Unit } from '@/schemas/Unit.schema';

interface GetUnitsParams {
  page: number | 'all';
  orgUid?: string;
  search?: string;
  order?: string;
  filter?: string;
}

interface GetUnitParams {
  warehouseUnitId: string;
}

interface TokenizeParams {}

export interface GetUnitsResponse {
  page: number;
  pageCount: number;
  data: Unit[];
}

const unitsApi = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getUntokenizedUnits: builder.query<GetUnitsResponse, GetUnitsParams>({
      query: ({ page, search, order, filter }: GetUnitsParams) => {
        // Initialize the params object with page and limit
        const params: GetUnitsParams & { limit: number } = { page, limit: RECORDS_PER_PAGE };

        if (search) {
          params.search = search.replace(/[^a-zA-Z0-9 _.-]+/, '');
        }

        if (order) {
          params.order = order;
        }

        if (filter) {
          params.filter = filter;
        }

        return {
          url: `/units/untokenized`,
          params,
          method: 'GET',
        };
      },
      providesTags: [untokenizedUnitsTag],
    }),

    getTokenizedUnits: builder.query<GetUnitsResponse, GetUnitsParams>({
      query: ({ page, search, order, filter }: GetUnitsParams) => {
        // Initialize the params object with page and limit
        const params: GetUnitsParams & { limit: number } = { page, limit: RECORDS_PER_PAGE };

        if (search) {
          params.search = search.replace(/[^a-zA-Z0-9 _.-]+/, '');
        }

        if (order) {
          params.order = order;
        }

        if (filter) {
          params.filter = filter;
        }

        return {
          url: `/units/tokenized`,
          params,
          method: 'GET',
        };
      },
      providesTags: [tokenizedUnitsTag],
    }),

    getUnit: builder.query<Unit, GetUnitParams>({
      query: ({ warehouseUnitId }: GetUnitParams) => ({
        url: `/units/untokenized`,
        params: { warehouseUnitId },
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),

    tokenizeUnit: builder.mutation<any, TokenizeParams>({
      query: (tokenizeParams: TokenizeParams) => ({
        url: '/tokenize',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: tokenizeParams,
      }),
      invalidatesTags: [untokenizedUnitsTag, tokenizedUnitsTag, projectsTag, projectsByIdsTag],
    }),
  }),
});

export const invalidateUnitsApiTag = unitsApi.util.invalidateTags;

export const {
  useGetTokenizedUnitsQuery,
  useGetUntokenizedUnitsQuery,
  useLazyGetUnitQuery,
  useGetUnitQuery,
  useTokenizeUnitMutation,
} = unitsApi;
