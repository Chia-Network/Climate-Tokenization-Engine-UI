import { cadtApi } from './index';
import { Project } from '@/schemas/Project.schema';

interface GetProjectsParams {
  page?: number;
  orgUid?: string | null;
  search?: string | null;
  order?: string | null;
}

interface GetProjectsById {
  projectIds: string[];
}

interface GetProjectParams {
  warehouseProjectId: string;
}

interface GetProjectsResponse {
  page: number;
  pageCount: number;
  data: Project[];
}

const projectsApi = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<GetProjectsResponse, GetProjectsParams>({
      query: ({ page, orgUid, search, order }: GetProjectsParams) => {
        // Initialize the params object with page and limit
        const params: GetProjectsParams & { limit: number } = { page, limit: 10 };

        if (orgUid) {
          params.orgUid = orgUid;
        }

        if (search) {
          params.search = search.replace(/[^a-zA-Z0-9 _.-]+/, '');
        }

        if (order) {
          params.order = order;
        }

        return {
          url: `/projects`,
          params,
          method: 'GET',
        };
      },
    }),

    getProjectsImmediate: builder.mutation<GetProjectsResponse, GetProjectsParams>({
      query: ({ orgUid, search, order }: GetProjectsParams) => {
        // Initialize the params object with page and limit
        const params: GetProjectsParams = {};

        if (orgUid) {
          params.orgUid = orgUid;
        }

        if (search) {
          params.search = search.replace(/[^a-zA-Z0-9 _.-]+/, '');
        }

        if (order) {
          params.order = order;
        }

        return {
          url: `/projects`,
          params,
          method: 'GET',
        };
      },
    }),

    getProject: builder.query<Project, GetProjectParams>({
      query: ({ warehouseProjectId }: GetProjectParams) => ({
        url: `/projects`,
        params: { warehouseProjectId },
        method: 'GET',
      }),
    }),

    getProjectsByIdsImmediate: builder.mutation<Project[], GetProjectsById>({
      query: ({ projectIds }: GetProjectsById) => {
        const queryParams = new URLSearchParams();
        projectIds.forEach((projectId) => queryParams.append('projectIds', projectId));
        return {
          url: `/projects?${queryParams}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetProjectsQuery, useGetProjectsImmediateMutation, useGetProjectsByIdsImmediateMutation } =
  projectsApi;
