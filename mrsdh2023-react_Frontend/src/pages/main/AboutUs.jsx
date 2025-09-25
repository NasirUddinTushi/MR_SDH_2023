import CtaSection from '@/components/main/CtaSection';

import Services from '@/components/main/HeroServices';
import Testimonials from '@/components/main/Testimonials';
import React from 'react';
import AboutsectionImg from '../../assets/images/aboutus-section.png';
import AboutUsHero from '@/components/main/AboutUsHero';
import Countdown from '@/components/main/Countdown';
import About3 from '@/components/main/About3';
import About2 from '@/components/main/About2';
import Members from '@/components/main/Members';

const AboutUs = () => {
  return (
    <div className="bg-white">
      <AboutUsHero />
      <div className="relative h-[325px] md:h-[525px] lg:h-[625px] w-full">
        <img
          src={AboutsectionImg}
          alt="Modern cityscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <About2 />
      <Countdown />
      <About3 />
      {/* <Members/> */}
      <Testimonials />
      <CtaSection />
    </div>
  );
};

export default AboutUs;
