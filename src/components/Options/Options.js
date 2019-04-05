import React from 'react';

const Options = ({ options }) => {
  return (
    <select>
      {
        options.map(option => (
          <option key={option.value}>{ option.name }</option>
        ))
      }
    </select>
  );
}

export default Options;