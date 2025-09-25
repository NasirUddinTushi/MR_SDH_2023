import React from 'react';
import CtaSection from '@/components/main/CtaSection';
import Faq from '@/components/main/Faq';
import ContactSection from '@/components/main/ContactSection';
import MapSection from '@/components/main/MapSection';

const ContactUs = () => {
  return (
    <div className="bg-white">
      <ContactSection />
      <MapSection />
      <Faq />
      <CtaSection />
    </div>
  );
};

export default ContactUs;
