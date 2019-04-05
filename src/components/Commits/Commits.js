import React from 'react';

import Commit from './Commit';

import './Commits.css';

const Commits = ({ data }) => (
  <div className="Commits">
    {
      data.map((item, index) => (
        <Commit key={index} data={item} />
      ))
    }
  </div>
);

export default Commits;