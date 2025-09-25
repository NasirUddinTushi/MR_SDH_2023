import React from 'react';

const MapSection = () => {
  return (
    <section className="w-full h-[400px]">
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509432!2d144.95565131592633!3d-37.8173139797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577f5bda376cf0!2sSouthbank%20VIC%203006%2C%20Australia!5e0!3m2!1sen!2sbd!4v1626266585245!5m2!1sen!2sbd"
        width="100%"
        height="100%"
        allowFullScreen=""
        loading="lazy"
        className="border-0"
      ></iframe>
    </section>
  );
};

export default MapSection;
