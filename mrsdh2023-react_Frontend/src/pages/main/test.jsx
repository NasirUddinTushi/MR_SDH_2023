import React, { useState } from 'react';

// --- ICONS (using inline SVGs for simplicity and no dependencies) ---

const BriefcaseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-10 w-10 text-white mb-4"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const UserCheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-10 w-10 text-white mb-4"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <polyline points="17 11 19 13 23 9"></polyline>
  </svg>
);

const BarChartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-10 w-10 text-white mb-4"
  >
    <line x1="12" y1="20" x2="12" y2="10"></line>
    <line x1="18" y1="20" x2="18" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="16"></line>
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 transition-transform duration-300"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// --- 1. HERO COMPONENT ---

const Hero = () => {
  return (
    <div className="relative bg-gray-800 text-white">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
        alt="Modern cityscape"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] md:min-h-[80vh] text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold max-w-4xl leading-tight">
          Unlock Smarter Solutions for a Stronger Business
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl text-gray-300">
          Empowering Your Vision with Strategic Excellence and Innovative
          Consulting
        </p>
        <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
            Improving Your Strategies
          </button>
          <button className="px-8 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
            Contact Us Now
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 2. ABOUT COMPONENT ---

const About = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop"
              alt="Business professionals collaborating"
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
          {/* Text Content Section */}
          <div className="w-full md:w-1/2">
            <span className="text-sm font-bold text-gray-500 uppercase">
              About Us
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
              We Don't Just Consult; We Collaborate, Empower, and Create Lasting
              Impact
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Our team works as an extension of yours, diving deep to understand
              your challenges and goals. We bring cross-industry expertise to
              deliver not just reports, but actionable strategies that drive
              real growth and innovation.
            </p>
            <button className="mt-8 px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 3. SERVICES COMPONENT ---

const ServiceCard = ({ icon, title, description, highlighted = false }) => {
  const cardClasses = `p-8 rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2 ${
    highlighted ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
  }`;
  const textColor = highlighted ? 'text-gray-300' : 'text-gray-600';
  const linkColor = highlighted
    ? 'text-white hover:text-gray-300'
    : 'text-gray-900 hover:text-gray-700';

  return (
    <div className={cardClasses}>
      {icon}
      <h3 className="text-2xl font-bold mt-4">{title}</h3>
      <p className={`mt-2 ${textColor}`}>{description}</p>
      <a href="#" className={`mt-6 inline-block font-semibold ${linkColor}`}>
        Discover More →
      </a>
    </div>
  );
};

const Services = () => {
  const servicesData = [
    {
      icon: <BriefcaseIcon />,
      title: 'Business Services',
      description:
        'Strategic planning, market analysis, and operational improvements to scale your business effectively.',
    },
    {
      icon: <UserCheckIcon />,
      title: 'Personal Credit & Financial Services',
      description:
        'Tailored financial advice, credit management, and wealth-building strategies for individuals.',
      highlighted: true,
    },
    {
      icon: <BarChartIcon />,
      title: 'Multi-ownership Services',
      description:
        'Expert guidance on partnership agreements, co-ownership structures, and investment syndication.',
    },
    {
      icon: <BriefcaseIcon />,
      title: 'Legal & Record Assistance',
      description:
        'Comprehensive support for legal documentation, compliance, and maintaining meticulous records.',
    },
    {
      icon: <UserCheckIcon />,
      title: 'Business Services',
      description:
        'Our core offering, providing deep insights and transformative solutions for corporate clients.',
      highlighted: true,
    },
    {
      icon: <BarChartIcon />,
      title: 'Personal Credit & Financial Services',
      description:
        'Helping you navigate the complexities of personal finance to secure your future.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <span className="text-sm font-bold text-gray-500 uppercase">
          Our Services
        </span>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
          How We Help You Grow
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
          We offer a comprehensive suite of services designed to address your
          most pressing challenges and unlock new opportunities.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 4. TESTIMONIALS COMPONENT ---

const TestimonialCard = ({ quote, name, title, avatar }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <div className="flex items-center mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <p className="text-gray-600 italic">"{quote}"</p>
    <div className="flex items-center mt-6">
      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div>
        <p className="font-bold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-bold text-gray-500 uppercase">
            Testimonials
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Client Success Stories
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
            Hear what our clients have to say about their experience working
            with us.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TestimonialCard
            quote="Working with them was a game-changer. Their insights led to a 40% increase in our operational efficiency. Truly remarkable."
            name="Elena Rodriguez"
            title="CEO, Innovatech"
            avatar="https://i.pravatar.cc/150?img=1"
          />
          <TestimonialCard
            quote="The team's dedication and expertise are unmatched. They didn't just provide a solution; they became a part of our team."
            name="Marcus Chen"
            title="Founder, QuantumLeap"
            avatar="https://i.pravatar.cc/150?img=3"
          />
        </div>
      </div>
    </section>
  );
};

// --- 5. FAQ COMPONENT ---

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="text-lg font-semibold text-gray-800">{question}</span>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <ChevronDownIcon />
        </span>
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pt-4 text-gray-600">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
  const faqData = [
    {
      question: 'What industries do you specialize in?',
      answer:
        'We have a diverse team with experience across technology, finance, healthcare, and retail. Our core strength is applying cross-industry best practices to solve unique business challenges.',
    },
    {
      question: 'How do you measure the success of a project?',
      answer:
        "Success is measured against pre-defined KPIs that we establish with you at the project's outset. These typically include metrics like revenue growth, cost savings, market share, and customer satisfaction.",
    },
    {
      question: 'What is your typical engagement model?',
      answer:
        'We offer flexible engagement models, from project-based consulting to long-term retainer partnerships. We tailor our approach to fit your specific needs and budget.',
    },
    {
      question: 'How long does a typical consulting project take?',
      answer:
        'Project timelines vary based on scope and complexity, but a typical engagement lasts between 3 to 6 months. We focus on delivering actionable results in phases to provide value quickly.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-bold text-gray-500 uppercase">FAQ</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
            Find answers to common questions about our services and process.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 6. CTA (CALL TO ACTION) COMPONENT ---

const CtaSection = () => {
  return (
    <div className="relative bg-gray-900">
      <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
        alt="Team collaborating in a modern office"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-28 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Ready to Transform Your Business?
        </h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Let's start a conversation about your goals. Schedule a free,
          no-obligation consultation with our experts today.
        </p>
        <button className="mt-8 px-10 py-4 bg-white text-gray-900 font-bold rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT (to assemble the page) ---

