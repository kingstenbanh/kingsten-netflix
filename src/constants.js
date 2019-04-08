export const sortOptions = [{
  value: '',
  name: 'Sort: Best match',
}, {
  value: 'sort=stars&order=desc',
  name: 'Sort: Most stars',
}, {
  value: 'sort=stars&order=asc',
  name: 'Sort: Fewest stars',
}, {
  value: 'sort=forks&order=desc',
  name: 'Sort: Most forks',
}, {
  value: 'sort=forks&order=asc',
  name: 'Sort: Fewest forks',
}, {
  value: 'sort=updated&order=desc',
  name: 'Sort: Recently updated',
}, {
  value: 'sort=updated&order=asc',
  name: 'Sort: Least recently updated',
}];

export const LOADING = 'LOADING';
export const TOGGLE_SIDE_PANEL = 'TOGGLE_SIDE_PANEL';
export const UPDATE_CACHES = 'UPDATE_CACHES';

export const UPDATE_SORT_AND_ORDER = 'UPDATE_SORT_AND_ORDER';
export const UPDATE_REPOS = 'UPDATE_REPOS';
export const UPDATE_REPO_PAGE = 'UPDATE_REPO_PAGE';

export const UPDATE_COMMITS = 'UPDATE_COMMITS';
export const UPDATE_COMMIT_PAGE = 'UPDATE_COMMIT_PAGE';
