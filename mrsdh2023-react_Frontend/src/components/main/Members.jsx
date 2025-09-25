import React from 'react';
import CommonMiniHeader from '../shared/CommonMiniHeader';
import Title from '../shared/Title';
import Subtitle from '../shared/Subtitle';
import member1 from '../../assets/images/member1.jpg';
import member2 from '../../assets/images/member2.png';
import member3 from '../../assets/images/member3.png';
import member4 from '../../assets/images/member4.png';
import member5 from '../../assets/images/member5.png';
import member6 from '../../assets/images/member6.png';
import member7 from '../../assets/images/member7.png';
import member8 from '../../assets/images/member8.png';

const teamMembers = [
  {
    name: 'John Smith',
    role: 'Chief Operating Officer',
    image: member2,
  },
  {
    name: 'Sarah Johnson',
    role: 'Chief Financial Officer',
    image: member3,
  },
  {
    name: 'Emma Thompson',
    role: 'Senior Business Consultant',
    image: member4,
  },
  {
    name: 'Jane Doe',
    role: 'Chief Executive Officer',
    image: member5,
  },
  {
    name: 'John Smith',
    role: 'Chief Operating Officer',
    image: member6,
  },
  {
    name: 'Sarah Johnson',
    role: 'Chief Financial Officer',
    image: member7,
  },
  {
    name: 'Emma Thompson',
    role: 'Senior Business Consultant',
    image: member8,
  },
  {
    name: 'Jane Doe',
    role: 'Chief Executive Officer',
    image: member4,
  },
];

const Members = () => {
  return (
    <section className="bg-[#f9f9f9] py-20 px-4 md:px-10 lg:px-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center">
          <CommonMiniHeader miniHeaderText="Members" />
        </div>
        <div className="mt-2" data-aos="zoom-out-down">
          <Title titleText="The People Behind the Vision" />
        </div>
        <div
          data-aos="fade-left"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-duration="1500"
        >
          <Subtitle subtitleText="We’re more than consultants we’re a close-knit team of thinkers, doers, and collaborators who care deeply about making a difference. Get to know the minds behind our mission." />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white overflow-hidden ">
            <div className="bg-[#D9D9D9] h-[328px] md:min-h-[358px] lg:min-h-[408px] relative">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-[280px] md:h-[260px] lg:h-[350px] absolute bottom-0 object-top  object-cover"
              />
            </div>

            <div className="p-4 text-center">
              <h3 className="font-[Inter] text-[#3D4040] text-center text-[18px] md:text-[20px] lg:text-[24px] not-italic font-semibold leading-[32px]">
                {member.name}
              </h3>
              <p className="text-[#3D4040] text-center font-[Inter] text-[15px] md:text-[16px] not-italic font-normal leading-[150%]">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Members;
