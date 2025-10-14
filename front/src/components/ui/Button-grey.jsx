import React from 'react';

const ButtonGrey = ({ onClick,  text , className}) => {
  return (
    <button className={`btn-grey ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default ButtonGrey;
