import { projectsByIdsTag, projectsTag, RECORDS_PER_PAGE, tokenizationEngineApi } from './index';
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

const projectsApi = tokenizationEngineApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<GetProjectsResponse, GetProjectsParams>({
      query: ({ page, orgUid, search, order }: GetProjectsParams) => {
        // Initialize the params object with page and limit
        const params: GetProjectsParams & { limit: number } = { page, limit: RECORDS_PER_PAGE };

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
      providesTags: [projectsTag],
    }),

    getProject: builder.query<Project, GetProjectParams>({
      query: ({ warehouseProjectId }: GetProjectParams) => ({
        url: `/projects`,
        params: { warehouseProjectId },
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),

    getProjectsByIds: builder.query<Project[], GetProjectsById>({
      query: ({ projectIds }: GetProjectsById) => {
        const queryParams = new URLSearchParams();
        projectIds.forEach((projectId) => queryParams.append('projectIds', projectId));
        return {
          url: `/projects?${queryParams}`,
          method: 'GET',
        };
      },
      providesTags: [projectsByIdsTag],
    }),
  }),
});

export const invalidateProjectApiTag = projectsApi.util.invalidateTags;

export const { useGetProjectsQuery, useLazyGetProjectsByIdsQuery, useGetProjectQuery } = projectsApi;
