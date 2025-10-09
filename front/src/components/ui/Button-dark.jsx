import React from 'react';

const ButtonDark = ({ onClick,  text }) => {
  return (
    <button className="btn-dark btn" onClick={onClick}>
      {text}
    </button>
  );
};

export default ButtonDark;
