import React from 'react';

import './Options.css';

const Options = ({ options, value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <select className="Options" value={value} onChange={handleChange}>
      {
        options.map((option, index) => (
          <option key={index} value={option.value}>{ option.name }</option>
        ))
      }
    </select>
  );
}

export default Options;