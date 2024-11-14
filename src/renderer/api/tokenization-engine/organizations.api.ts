import { tokenizationEngineApi } from './index';
import { Organization } from '@/schemas/Organization.schema';
// @ts-ignore
import { BaseQueryResult } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

const organizationsApi = tokenizationEngineApi.injectEndpoints({
  endpoints: (builder) => ({
    getHomeOrg: builder.query<Organization | undefined, void | null>({
      query: () => ({
        url: `/organizations`,
        method: 'GET',
      }),
      transformResponse(baseQueryReturnValue: BaseQueryResult<Organization[]>): Organization | undefined {
        const organizations: Organization[] = Object.values(baseQueryReturnValue);
        return organizations.find((org) => org.isHome);
      },
    }),
  }),
});

export const { useGetHomeOrgQuery } = organizationsApi;
