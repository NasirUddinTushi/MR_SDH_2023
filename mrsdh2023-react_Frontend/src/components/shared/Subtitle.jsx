import React from 'react'

const Subtitle = ({ subtitleText }) => {
  return (
    <h5 className="text-[rgba(61,_64,_64,_0.60)]  font-[Inter] text-[15px] md:text-[16px] not-italic font-normal leading-[28px] mt-1" >
      {subtitleText}
    </h5>
  );
};

export default Subtitle