import { cadtApi, RECORDS_PER_PAGE, tokenizedUnitsTag, untokenizedUnitsTag } from './index';
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
  }),
});

export const invalidateUnitsApiTag = unitsApi.util.invalidateTags;

export const { useGetTokenizedUnitsQuery, useGetUntokenizedUnitsQuery, useLazyGetUnitQuery, useGetUnitQuery } =
  unitsApi;
