import React from 'react';

import './Commits.css';

const CommitPagination = ({ action, commitPage }) => {
  const disabledNewer = commitPage === 1;
  const getNewerCommits = () => {
    action('DECREASE');
  };

  const getOlderCommits = () => {
    action('INCREASE');
  };

  return (
    <div className="CommitPagination">
      <button className="toggle-btn" disabled={disabledNewer} onClick={getNewerCommits}>Newer</button>
      <button className="toggle-btn" onClick={getOlderCommits}>Older</button>
    </div>
  );
}

export default CommitPagination;