import React from 'react';


const Img = ({ imageSrc,  }) => {
  return (
    <div className="img">
        <div className="img-image-wrapper">
          <img src={imageSrc} alt="work" />
        </div>

    </div>
  );
};

export default Img;
