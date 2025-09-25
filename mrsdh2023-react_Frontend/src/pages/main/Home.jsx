import About from '@/components/main/About';
import CtaSection from '@/components/main/CtaSection';
import Faq from '@/components/main/Faq';
import Hero from '@/components/main/Hero';
import Services from '@/components/main/HeroServices';
import Testimonials from '@/components/main/Testimonials';
import React from 'react'
import sectionImg from '../../assets/images/sectionImg.png'

const  Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <div className="relative h-[325px] md:h-[525px] lg:h-[625px] w-full">
        <img
          src={sectionImg}
          alt="Modern cityscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <About />
      <Services />
      <Testimonials />
      <Faq />
      <CtaSection />
    </div>
  );
}

export default Home