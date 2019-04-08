class Actions {
  constructor(dispatch, state) {
    this.dispatch = dispatch;
    this.state = state;
  }

  toggleSidePanel = () => this.dispatch({ type: 'TOGGLE_SIDE_PANEL' })

  setLoading = (isLoading) => this.dispatch({ type: 'LOADING', payload: isLoading })

  updateCaches = (url, response) => this.dispatch({
    type: 'UPDATE_CACHES',
    payload: {
      url,
      response,
    }
  })

  updateSortAndOrder = (value) => this.dispatch({
    type: 'UPDATE_SORT_AND_ORDER',
    payload: value,
  })

  getRepos = async(user = 'Netflix') => {
    const { caches, repoPage, sortAndOrder } = this.state;
    const baseUrl = "https://api.github.com/search/repositories";
    const url = `${baseUrl}?q=user:${user}&page=${repoPage + 1}&${sortAndOrder}`;
    const response = caches[url];

    if (response) {
      this.updateRepos(url, response);
    } else {
      this.setLoading(true);

      fetch(url)
        .then((blob) => blob.json())
        .then((response) => {
          this.updateRepos(url, response);   
          this.setLoading(false);
        });
    }
  }

  updateRepos = (url, response) => this.dispatch({
    type: 'UPDATE_REPOS',
    payload: {
      url,
      response,
    },
  })

  updateRepoPage = (repoPage) => this.dispatch({
    type: 'UPDATE_REPO_PAGE',
    payload: repoPage,
  })

  getCommits = async(repoName, commitPage = 0) => {
    const { caches } = this.state;
    const url = `https://api.github.com/repos/${repoName}/commits?page=${commitPage + 1}`;
    const response = caches[url];

    if (response) {
      this.updateCommits(repoName, response);
    } else {
      fetch(url)
        .then((blob) => blob.json())
        .then((response) => {
          this.updateCommits(repoName, response);
          this.updateCaches(url, response);
        });
    }
  }

  updateCommits = (repoName, response) => {
    this.dispatch({
      type: 'UPDATE_COMMITS',
      payload: {
        repoName,
        response,
      },
    });
  }

  updateCommitPage = async (type) => {
    const { commitPage, currentRepo } = this.state;
    let newCommitPage = commitPage;

    if (type == 'INCREASE') {
      newCommitPage += 1;
    } else {
      newCommitPage = Math.max(newCommitPage - 1, 0);
    }

    await this.dispatch({
      type: 'UPDATE_COMMIT_PAGE',
      payload: newCommitPage,
    });
    await this.getCommits(currentRepo, newCommitPage);
  }
};

export default Actions;