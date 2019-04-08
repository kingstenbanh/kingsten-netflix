import React from 'react';
import { format } from 'timeago.js';

import { numberFormatter, truncate } from '../../helpers';
const Repo = ({ data, action }) => {
  
  const handleOpenRepo = () => {
    action(data.full_name);
  }

  return (
    <div className="Repo" onClick={handleOpenRepo}>
      <div className="Repo-desc">
        <div className="Repo-desc-content">
          <h2 className="header-two">
            <a>{ data.full_name }</a>
          </h2>

          <p className="text-gray">
            { truncate(data.description || '') }
          </p>

        </div>
        <div className="Repo-meta">
          {
            data.license && (
              <p className="text-gray text-small">
                { data.license.name }
              </p>
            ) 
          }
          <p className="text-gray text-small">
            Updated on { format(data.pushed_at) }
          </p>
        </div>
      </div>
      
      <div className="Repo-stats">
        <span className="Repo-stat">
          <img className="icon" src="/static/assets/fork.svg" alt="Fork Icon" />
          { numberFormatter(data.forks_count) }
        </span>

        <span className="Repo-stat">
          <img className="icon" src="/static/assets/star.svg" alt="Star Icon" />
          { numberFormatter(data.stargazers_count) }
        </span>

        <span className="Repo-stat">
          <img className="icon" src="/static/assets/watch.svg" alt="Watch Icon"/>
          { numberFormatter(data.watchers_count) }
        </span>
      </div>
    </div>
  );
}

export default Repo;

