import React, { useState, useEffect } from 'react';

import { 
  Commits, 
  Header, 
  Loading,
  Options, 
  Repos, 
  Pagination,
  SidePanel,
} from './components';

import './App.css';

const options = [{
  value: 'forks',
  name: 'Sort: Most forks',
}, {
  value: 'stars',
  name: 'Sort: Most stars',
}];

const App = () => {
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [repos, setRepos] = useState([]);
  const [caches, setCaches] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [commits, setCommits] = useState({});
  const [currentRepo, setCurrentRepo] = useState('');
  const [openSide, setOpenSide] = useState(false);
  const [repoMap, setRepoMap] = useState({});

  useEffect(() => {
    getRepos();
  }, [repos, page]); 

  const itemsToMap = (items) => {
    return items.reduce((map, item) => {
      map[item.full_name] = item;
      return map;
    }, {})
  }

  const updateRepos = ({ total_count, items }) => {
    const newRepoMap = {
      ...repoMap,
      ...itemsToMap(items),
    };

    setTotal(total_count);
    setRepos(items);
    setRepoMap(newRepoMap);
    setIsLoading(false);
  }

  const getRepos = (user = 'Netflix', sort = 'forks') => {
    const baseUrl = "https://api.github.com/search/repositories";
    const requestUrl = `${baseUrl}?q=user:${user}&sort=${sort}&page=${page + 1}`;

    setIsLoading(true);

    if (caches[requestUrl]) {
      updateRepos(caches[requestUrl]);
    } else {
      fetch(requestUrl)
        .then((blob) => blob.json())
        .then((response) => {
          updateRepos(response);     
          const newCaches = { 
            ...caches,
            [requestUrl]: response,
          };
          setCaches(newCaches);
        });
    }
  }

  const toggleSide = () => setOpenSide(!openSide);

  const updateCommits = (repoName, response) => {
    commits[repoName] = response;
    
    toggleSide();
    setCurrentRepo(repoName);
    setCommits(commits);
  }

  const getCommits = (repoName, page = 1) => {
    const requestUrl = `https://api.github.com/repos/${repoName}/commits?page=${page}`;

    if (caches[requestUrl]) {
      updateCommits(repoName, caches[requestUrl]);
    } else {
      fetch(requestUrl)
        .then((blob) => blob.json())
        .then((response) => {
          updateCommits(repoName, response);
          const newCaches = {
            ...caches,
            [requestUrl]: response,
          };
          setCaches(newCaches);
        });
    }
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
                    { total } repository results
                  </h1>
      
                  <Options options={options} />
                </div>
      
                <Repos data={repos} action={getCommits} />
      
                <Pagination 
                  action={setPage} 
                  totalItems={total} 
                  currentPage={page} 
                />
              </div>
          )
        }
      </div>

      <SidePanel isOpen={openSide} repo={repoMap[currentRepo]} close={toggleSide}>
        <Commits data={commits[currentRepo] || []} />
      </SidePanel>
    </div>
  );
}

export default App;
