import React, { useEffect, useReducer } from 'react';

import { 
  Commits, 
  Header, 
  Loading,
  Options, 
  Repos, 
  Pagination,
  SidePanel,
} from './components';
import { initialState, reducer } from './reducer';
import Actions from './actions';
import { sortOptions } from './constants';

import './App.css';
import { CommitPagination } from './components/Commits';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = new Actions(dispatch, state);
  const {
    isLoading,
    isSidePanelOpen,
    totalRepos,
    sortAndOrder,
    repoPage,
    repos,
    repoMap,
    currentRepo,
    commitPage,
    commits,
  } = state;

  useEffect(() => {
    actions.getRepos();
  }, [repoPage, sortAndOrder]); 

  const handleGetCommits = (repoName) => {
    actions.resetCommitPage();
    actions.toggleSidePanel();
    actions.getCommits(repoName);
  }

  return (
    <div className="App">
      <Header />

      <div className="App-body">
        {
          isLoading ? <Loading /> : (
              <div className="Content">
                <div className="Content-header">
                  <h1>
                    { totalRepos } repository results
                  </h1>
      
                  <Options 
                    value={sortAndOrder}
                    options={sortOptions} 
                    onChange={actions.updateSortAndOrder} 
                  />
                </div>
      
                <Repos data={repos} action={handleGetCommits} />
      
                <Pagination 
                  action={actions.updateRepoPage} 
                  totalItems={totalRepos} 
                  currentPage={repoPage} 
                />
              </div>
          )
        }
      </div>

      <SidePanel 
        isOpen={isSidePanelOpen} 
        title={repoMap[currentRepo] && repoMap[currentRepo].full_name} 
        close={actions.toggleSidePanel}
      >
        <Commits data={commits[currentRepo] || []} />

        <CommitPagination 
          action={actions.updateCommitPage} 
          commitPage={commitPage}
        />
      </SidePanel>
    </div>
  );
}

export default App;
