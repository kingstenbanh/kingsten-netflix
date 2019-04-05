import React from 'react';

import Repo from './Repo';

import './Repos.css';

const Repos = ({ data, action }) => {
  return (
    <div className="Repos">
      {
        data.map((item) => (
          <Repo key={item.id} data={item} action={action} />
        ))
      }
    </div>
  );
}

export default Repos;