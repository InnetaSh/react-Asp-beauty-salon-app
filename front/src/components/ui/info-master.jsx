import React from 'react';

const InfoMaster = ({ master }) => {
    return (
        <div className='title-container '>
            <div className='text-wrapper '>

                <div className='small-text'>specialization:
                    <div className='big-text'>
                        {master.specialization}
                    </div>
                </div>
            </div>
            <div className='small-text'>experience:
                <div className='big-text'>
                    {master.experience}
                </div>
            </div>
        </div>
          

        
    );
};
export default InfoMaster;
