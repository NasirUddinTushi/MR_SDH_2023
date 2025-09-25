import React from 'react'

const Title = ({titleText}) => {
  return (
    <h2 className='text-[#3D4040]  font-["Inter"] text-[28px] sm:text-[30px] md:text-[40px] lg:text-[60px]  not-italic font-semibold leading-[30px] sm:leading-[40px] md:leading-[50px] lg:leading-[70px]'>
      {titleText}
    </h2>
  );
}

export default Title