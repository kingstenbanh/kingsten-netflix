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
  console.log(type, payload);
  
  switch (type) {
    case 'LOADING': {
      return {
        ...state,
        isLoading: payload,
      };
    }

    case 'TOGGLE_SIDE_PANEL': {
      return {
        ...state,
        isSidePanelOpen: !state.isSidePanelOpen,
      };
    }

    case 'UPDATE_CACHES': {
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

    case 'UPDATE_SORT_AND_ORDER': {
      return {
        ...state,
        sortAndOrder: payload, 
      };
    }

    case 'UPDATE_REPOS': {
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

    case 'UPDATE_REPO_PAGE': {
      return {
        ...state,
        repoPage: payload,
      };
    }

    case 'UPDATE_COMMITS': {
      const { repoName, response } = payload;

      return {
        ...state,
        commits: {
          [repoName]: response,
        },
        currentRepo: repoName,
      };
    }

    case 'UPDATE_COMMIT_PAGE': {
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