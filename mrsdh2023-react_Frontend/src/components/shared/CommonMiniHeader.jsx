
import React from 'react'

const CommonMiniHeader = ({miniHeaderText}) => {
  return (
    <p className="text-[#956D26] text-center font-[Inter] text-[13px] md:text-[14px] not-italic font-medium leading-[24px] rounded-[50px] bg-[rgba(193,_176,_146,_0.20)] px-[40px] py-[4px] w-fit">
      {miniHeaderText}
    </p>
  );
}

export default CommonMiniHeader