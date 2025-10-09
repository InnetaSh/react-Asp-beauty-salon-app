import React from 'react';

const Button = ({ onClick,  text }) => {
  return (
    <button className="btn-gold btn" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
