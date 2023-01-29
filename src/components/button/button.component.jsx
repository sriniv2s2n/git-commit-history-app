import React from 'react';

import './button.styles.scss';

const Button = ({ btnLabel, onClick }) => {
  return (
    <div className="button-container">
      <button type="button" onClick={onClick}>
        {btnLabel}
      </button>
    </div>
  );
};

export default Button;
