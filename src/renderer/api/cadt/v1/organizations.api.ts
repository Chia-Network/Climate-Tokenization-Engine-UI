import { cadtApi } from './';
import { Organization } from '@/schemas/Organization.schema';
// @ts-ignore
import { BaseQueryResult } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

const organizationsApi = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getHomeOrg: builder.query<Organization | undefined, void | null>({
      query: () => ({
        url: `/v1/organizations`,
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
