import * as constants from './constants';

const initialState = {
  isLoading: true,
  isSidePanelOpen: false,
  totalRepos: 0,
  repoPage: 0,
  sortAndOrder: '',
  repos: [],
  caches: {},
  commitPage: 1,
  commits: {},
  currentRepo: '',
  repoMap: {},
};

const itemsToMap = (items) => {
  return items.reduce((map, item) => {
    map[item.full_name] = item;
    return map;
  }, {})
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case constants.LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }

    case constants.TOGGLE_SIDE_PANEL: {
      return {
        ...state,
        isSidePanelOpen: !state.isSidePanelOpen,
      };
    }

    case constants.UPDATE_CACHES: {
      const { url, response } = payload;
      const newCaches = {
        ...state.caches,
        [url]: response,
      };

      return {
        ...state,
        caches: newCaches,
      };
    }

    case constants.UPDATE_SORT_AND_ORDER: {
      return {
        ...state,
        sortAndOrder: payload, 
      };
    }

    case constants.UPDATE_REPOS: {
      const {
        url,
        response,
      } = payload;
      const { 
        total_count: totalRepos, 
        items: repos = [],
       } = response;
       const newCaches = {
        ...state.caches,
        [url]: response,
      };
      const newRepoMap = {
        ...state.repoMap,
        ...itemsToMap(repos),
      }

      return {
        ...state,
        totalRepos,
        repos,
        caches: newCaches,
        repoMap: newRepoMap,
      };
    }

    case constants.UPDATE_REPO_PAGE: {
      return {
        ...state,
        repoPage: payload,
      };
    }

    case constants.UPDATE_COMMITS: {
      const { repoName, response } = payload;

      return {
        ...state,
        commits: {
          [repoName]: response,
        },
        currentRepo: repoName,
      };
    }

    case constants.UPDATE_COMMIT_PAGE: {
      return {
        ...state,
        commitPage: payload,
      };
    }

    default: {
      return state;
    }
  }
}

export {
  initialState,
  reducer,
};