import React, { useState, useEffect, useReducer, useContext } from 'react';

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

import './App.css';

const options = [{
  value: 'forks',
  name: 'Sort: Most forks',
}, {
  value: 'stars',
  name: 'Sort: Most stars',
}];

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = new Actions(dispatch, state);
  const {
    isLoading,
    isSidePanelOpen,
    totalRepos,
    repoPage,
    repos,
    repoMap,
    currentRepo,
    commits,
  } = state;

  useEffect(() => {
    actions.getRepos();
  }, [repoPage]); 

  const handleGetCommits = (repoName) => {
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
      
                  <Options options={options} />
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

        <div className="">
          <button onClick={() => actions.updateCommitPage('DECREASE')}>Newer</button>
          <button onClick={() => actions.updateCommitPage('INCREASE')}>Older</button>
        </div>
      </SidePanel>
    </div>
  );
}

export default App;
