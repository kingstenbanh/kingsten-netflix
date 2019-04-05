import React from 'react';
import { format } from 'timeago.js';

import { truncate } from '../../helpers';

const Commit = ({ data }) => {
  const { html_url, author = {}, commit } = data;

  return (
    <div className="Commit">
      <a href={html_url} target="_blank" rel="noopener noreferrer">
        <div className="Commit-message">{ truncate(commit.message, 70) }</div>
      </a>

      <div className="Commit-stats">
        {
          author && (
            <>
              <a className="Author-link" href={author && author.url} target="_blank" rel="noopener noreferrer">
                <img className="Author-image" src={`${author.avatar_url}&s=60`} />
                <span>{ author.login }</span>
              </a>
              <span className="Commit-time">
                commited { format(author.date) }
              </span>
            </>
          )
        }
      </div>
    </div>
  );
};

export default Commit;