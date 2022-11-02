import _ from 'lodash';
import constants from '../../constants';

import { keyMirror } from '../store-functions';
import { LANGUAGE_CODES } from '../../translations';

import { untokenizedUnitsStub, projectsStub } from '../mocks';

export const actions = keyMirror(
  'ACTIVATE_PROGRESS_INDICATOR',
  'DEACTIVATE_PROGRESS_INDICATOR',
  'TOGGLE_THEME',
  'SET_THEME',
  'SET_GLOBAL_ERROR_MESSAGE',
  'CLEAR_GLOBAL_ERROR_MESSAGE',
  'SET_LOCALE',
  'CONNECTION_CHECK',
  'SET_NOTIFICATION',
  'REFRESH_APP',
  'SET_UNTOKENIZED_UNITS',
  'SIGN_USER_IN',
  'SIGN_USER_OUT',
  'SET_PAGINATION_NR_OF_PAGES',
  'SET_TOKENS',
  'SET_PROJECTS',
  'SET_HOME_ORG',
  'SET_UNIT_TO_BE_DETOKENIZED',
);

export const setUnitToBeDetokenized = unit => ({
  type: 'SET_UNIT_TO_BE_DETOKENIZED',
  payload: unit,
});

export const refreshApp = render => ({
  type: actions.REFRESH_APP,
  payload: render,
});

export const setHomeOrg = homeOrg => ({
  type: actions.SET_HOME_ORG,
  payload: homeOrg,
});

export const setPaginationNrOfPages = number => ({
  type: actions.SET_PAGINATION_NR_OF_PAGES,
  payload: number,
});

export const setUntokenizedUnits = units => ({
  type: 'SET_UNTOKENIZED_UNITS',
  payload: units,
});

export const setProjects = projects => ({
  type: 'SET_PROJECTS',
  payload: projects,
});

export const setTokens = tokens => ({
  type: 'SET_TOKENS',
  payload: tokens,
});

export const activateProgressIndicator = {
  type: actions.ACTIVATE_PROGRESS_INDICATOR,
};

export const deactivateProgressIndicator = {
  type: actions.DEACTIVATE_PROGRESS_INDICATOR,
};

export const setThemeFromLocalStorage = {
  type: actions.SET_THEME,
  payload: localStorage.getItem('theme'),
};

export const toggleTheme = {
  type: actions.TOGGLE_THEME,
};

export const setGlobalErrorMessage = message => ({
  type: actions.SET_GLOBAL_ERROR_MESSAGE,
  payload: message,
});

export const clearGlobalErrorMessage = {
  type: actions.CLEAR_GLOBAL_ERROR_MESSAGE,
};

export const setConnectionCheck = bool => ({
  type: actions.CONNECTION_CHECK,
  payload: bool,
});

export const NotificationMessageTypeEnum = {
  error: 'error',
  success: 'success',
  null: 'null',
};

export const setNotificationMessage = (type, id) => {
  return async dispatch => {
    if (
      _.includes(Object.keys(NotificationMessageTypeEnum), type) &&
      typeof id === 'string'
    ) {
      dispatch({
        type: actions.SET_NOTIFICATION,
        payload: {
          id,
          type,
        },
      });
    }
    if (type === null) {
      dispatch({
        type: actions.SET_NOTIFICATION,
        payload: null,
      });
    }
  };
};

export const setLocale = locale => {
  let localeToSet = locale;

  // Default to en-US if language isnt supported
  if (
    !Object.keys(LANGUAGE_CODES)
      .map(key => LANGUAGE_CODES[key])
      .includes(locale)
  ) {
    localeToSet = 'en-US';
  }

  return {
    type: actions.SET_LOCALE,
    payload: localeToSet,
  };
};

export const signIn = ({ insertedApiKey, insertedServerAddress }) => {
  return async dispatch => {
    if (insertedApiKey && insertedServerAddress) {
      localStorage.setItem('apiKey', insertedApiKey);
      localStorage.setItem('serverAddress', insertedServerAddress);
      dispatch({
        type: actions.SIGN_USER_IN,
        payload: {
          insertedApiKey,
          insertedServerAddress,
        },
      });
      dispatch(refreshApp(true));
    }
  };
};

export const signOut = () => {
  return async dispatch => {
    localStorage.removeItem('apiKey');
    localStorage.removeItem('serverAddress');
    dispatch({
      type: actions.SIGN_USER_OUT,
      payload: {
        apiKey: null,
        serverAddress: null,
      },
    });
  };
};

export const importHomeOrg = orgUid => {
  return async dispatch => {
    const url = `${constants.API_HOST}/connect`;

    const payload = {
      method: 'POST',
      body: JSON.stringify({ orgUid }),
      headers: { 'Content-Type': 'application/json' },
    };

    dispatch(
      fetchWrapper({
        url,
        payload,
        successMessageId: 'organization-created',
        failedMessageId: 'organization-not-created',
      }),
    );
  };
};

export const addProjectDetailsToUnits = ({
  units,
  unitsType,
  isRequestMocked,
}) => {
  return async dispatch => {
    let url = `${constants.API_HOST}/projects?`;

    const projectsIdsNeededSearchQuery = units.reduce(
      (projectIdsQuery, currentUnit) => {
        const hasUnitProjectDetails = currentUnit?.issuance?.warehouseProjectId;
        if (hasUnitProjectDetails) {
          const isProjectIdNotAdded = !projectIdsQuery.includes(
            currentUnit?.issuance?.warehouseProjectId,
          );
          if (isProjectIdNotAdded) {
            return (
              projectIdsQuery +
              `projectIds=${currentUnit?.issuance?.warehouseProjectId}`
            );
          }
        }

        return projectIdsQuery;
      },
      '',
    );

    const areProjectNamesNeeded = projectsIdsNeededSearchQuery.length > 0;
    if (!areProjectNamesNeeded) {
      if (unitsType === 'untokenized') {
        dispatch(setUntokenizedUnits(units));
      } else if (unitsType === 'tokens') {
        dispatch(setTokens(units));
      }
    } else {
      url += projectsIdsNeededSearchQuery;

      const failedMessageId = 'projects-not-loaded';

      const onSuccessHandler = results => {
        const projectsHashmap = results.reduce(
          (accumulator, currentProject) => {
            return {
              ...accumulator,
              [currentProject.warehouseProjectId]: currentProject,
            };
          },
          {},
        );

        const unitsEnrichedWithProjectDetails = units.map(unitItem => {
          if (unitItem.issuance) {
            if (projectsHashmap[unitItem.issuance?.warehouseProjectId]) {
              return {
                ...unitItem,
                projectName:
                  projectsHashmap[unitItem.issuance?.warehouseProjectId]
                    .projectName,
                projectLink:
                  projectsHashmap[unitItem.issuance?.warehouseProjectId]
                    .projectLink,
              };
            }
          }
          return unitItem;
        });

        if (unitsType === 'untokenized') {
          dispatch(setUntokenizedUnits(unitsEnrichedWithProjectDetails));
        } else if (unitsType === 'tokens') {
          dispatch(setTokens(unitsEnrichedWithProjectDetails));
        }
      };

      dispatch(
        fetchWrapper({
          url,
          failedMessageId,
          onSuccessHandler,
          isRequestMocked,
          projectsStub,
        }),
      );
    }
  };
};

export const getUntokenizedUnits = ({
  page,
  resultsLimit,
  searchQuery,
  isRequestMocked,
}) => {
  return async dispatch => {
    const areRequestDetailsValid = true;
    // typeof page === 'number' && typeof resultsLimit === 'number';

    if (areRequestDetailsValid) {
      let url = `${constants.API_HOST}/units/untokenized?page=${
        page + 1
      }&limit=${resultsLimit}`;
      if (searchQuery && typeof searchQuery === 'string') {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }

      const onSuccessHandler = results => {
        dispatch(setPaginationNrOfPages(results.pageCount));
        dispatch(
          addProjectDetailsToUnits({
            units: results.data,
            unitsType: 'untokenized',
          }),
        );
      };

      const failedMessageId = 'untokenized-units-not-loaded';

      let responseStub = null;
      if (isRequestMocked) {
        responseStub = {};
        const randomResponseStubArrayIndex = Math.floor(
          Math.random() * (untokenizedUnitsStub.length - resultsLimit),
        );
        responseStub.data = untokenizedUnitsStub.slice(
          randomResponseStubArrayIndex,
          randomResponseStubArrayIndex + resultsLimit,
        );
        responseStub.pageCount = 3;
      }

      dispatch(
        fetchWrapper({
          url,
          failedMessageId,
          onSuccessHandler,
          isRequestMocked,
          responseStub,
        }),
      );
    }
  };
};

export const getProjects = ({ searchQuery, orgUid, isRequestMocked }) => {
  return async dispatch => {
    let url = `${constants.API_HOST}/projects?`;

    if (searchQuery) {
      url += `search=${searchQuery}`;
    }
    if (orgUid) {
      url += `orgUid=${orgUid}`;
    }

    const failedMessageId = 'projects-not-loaded';

    const onSuccessHandler = results => {
      dispatch(setProjects(results));
    };

    dispatch(
      fetchWrapper({
        url,
        failedMessageId,
        onSuccessHandler,
        isRequestMocked,
        projectsStub,
      }),
    );
  };
};

export const getTokens = ({
  page,
  resultsLimit,
  searchQuery,
  isRequestMocked,
}) => {
  return async dispatch => {
    const areRequestDetailsValid = true;
    typeof page === 'number' && typeof resultsLimit === 'number';

    if (areRequestDetailsValid) {
      let url = `${constants.API_HOST}/units/tokenized?page=${
        page + 1
      }&limit=${resultsLimit}`;
      if (searchQuery && typeof searchQuery === 'string') {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }

      const onSuccessHandler = results => {
        dispatch(
          addProjectDetailsToUnits({
            units: results.data,
            unitsType: 'tokens',
          }),
        );

        dispatch(setPaginationNrOfPages(results.pageCount));
      };

      const failedMessageId = 'tokens-not-loaded';

      let responseStub = null;
      if (isRequestMocked) {
        const randomResponseStubArrayIndex = Math.floor(
          Math.random() * (untokenizedUnitsStub.length - resultsLimit),
        );
        responseStub = untokenizedUnitsStub.slice(
          randomResponseStubArrayIndex,
          randomResponseStubArrayIndex + resultsLimit,
        );
      }

      dispatch(
        fetchWrapper({
          url,
          failedMessageId,
          onSuccessHandler,
          isRequestMocked,
          responseStub,
        }),
      );
    }
  };
};

export const tokenizeUnit = data => {
  return async dispatch => {
    let url = `${constants.API_HOST}/tokenize`;

    const payload = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const failedMessageId = 'unit-not-tokenized';
    const successMessageId = 'unit-was-tokenized';

    dispatch(
      fetchWrapper({
        url,
        payload,
        successMessageId,
        failedMessageId,
      }),
    );
  };
};

export const detokenizeUnit = data => {
  return async dispatch => {
    let url = `${constants.API_HOST}/parse-detok-file`;
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('password', data.password);
    const payload = {
      method: 'POST',
      body: formData,
    };

    const failedMessageId = 'detok-file-not-parsed';
    const successMessageId = 'detok-file-parsed';

    const onSuccessHandler = results => {
      dispatch(setUnitToBeDetokenized(results));
    };

    dispatch(
      fetchWrapper({
        url,
        payload,
        successMessageId,
        failedMessageId,
        onSuccessHandler,
      }),
    );
  };
};

// encapsulates error handling, network failure, loader toggling and on success or failed handlers
const fetchWrapper = ({
  url,
  payload,
  successMessageId,
  failedMessageId,
  onSuccessHandler,
  onFailedHandler,
  isRequestMocked,
  responseStub,
}) => {
  return async dispatch => {
    if (isRequestMocked && responseStub) {
      onSuccessHandler(responseStub);
    } else {
      try {
        dispatch(activateProgressIndicator);
        const response = await fetch(url, payload);

        const headers = response?.headers;
        if (headers.has('x-org-uid')) {
          const homeOrg = headers.get('x-org-uid');
          dispatch(setHomeOrg(homeOrg));
        } else {
          dispatch(setHomeOrg(null));
        }

        if (response.ok) {
          dispatch(setConnectionCheck(true));

          if (successMessageId) {
            dispatch(
              setNotificationMessage(
                NotificationMessageTypeEnum.success,
                successMessageId,
              ),
            );
          }

          if (onSuccessHandler) {
            const results = await response.json();
            onSuccessHandler(results);
          }
        } else {
          const errorResponse = await response.json();

          if (failedMessageId) {
            dispatch(
              setNotificationMessage(
                NotificationMessageTypeEnum.error,
                formatApiErrorResponse(errorResponse, failedMessageId),
              ),
            );
          }

          if (onFailedHandler) {
            onFailedHandler();
          }
        }
      } catch {
        dispatch(setConnectionCheck(false));

        if (failedMessageId) {
          dispatch(
            setNotificationMessage(
              NotificationMessageTypeEnum.error,
              failedMessageId,
            ),
          );
        }

        if (onFailedHandler) {
          onFailedHandler();
        }
      } finally {
        dispatch(deactivateProgressIndicator);
      }
    }
  };
};

const formatApiErrorResponse = (
  { errors, message, error },
  alternativeResponseId,
) => {
  if (!_.isEmpty(errors) && !_.isEmpty(message)) {
    let notificationToDisplay = message + ': ';
    errors.forEach(item => {
      notificationToDisplay = notificationToDisplay.concat(item, ' ; ');
    });
    return notificationToDisplay;
  }
  if (error) {
    return error;
  }
  return alternativeResponseId;
};
