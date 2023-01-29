import React from 'react';

import './input.styles.scss';

const Input = (props) => {
  return (
    <div className="input-container">
      <input className="input" {...props} />
      <label className={`label ${props.value ? 'shrink' : ''}`}>
        {props.label ?? ''}
      </label>
    </div>
  );
};

export default Input;
