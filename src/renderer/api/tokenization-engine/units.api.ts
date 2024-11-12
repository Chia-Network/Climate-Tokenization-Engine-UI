import { RECORDS_PER_PAGE, tokenizationEngineApi, tokenizedUnitsTag, untokenizedUnitsTag } from './index';
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

interface TokenData {
  org_uid: string;
  project_id: string;
  vintage_year: number;
  sequence_num: number;
  index: string;
  public_key: string;
  asset_id: string;
  warehouse_project_id: string;
}

export interface DetokenizationData {
  token: TokenData;
  content: string;
  unit: Unit;
}

interface TokenizeParams {
  org_uid: string;
  warehouse_project_id: string;
  vintage_year: number;
  sequence_num: number;
  warehouseUnitId: string;
  to_address: string;
  amount: number;
}

export interface GetUnitsResponse {
  page: number;
  pageCount: number;
  data: Unit[];
}

const unitsApi = tokenizationEngineApi.injectEndpoints({
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
    }),

    parseDetokenizationFile: builder.mutation<DetokenizationData, string>({
      query: (detokString) => ({
        url: '/parse-detok-file',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { detokString },
      }),
    }),

    detokenizeUnit: builder.mutation<any, DetokenizationData>({
      query: (detokenizationData) => ({
        url: '/confirm-detokenization',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: detokenizationData,
      }),
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
  useParseDetokenizationFileMutation,
  useDetokenizeUnitMutation,
} = unitsApi;
