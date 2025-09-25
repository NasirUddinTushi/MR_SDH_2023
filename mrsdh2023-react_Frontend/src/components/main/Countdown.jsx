import React, { useEffect, useState } from 'react';
import { useStatistics } from '@/hooks/cms.hook';

const Countdown = () => {
  const { data: statistics, isLoading, error } = useStatistics();
  const [counts, setCounts] = useState([]);

  // Initialize counts when statistics data is loaded
  useEffect(() => {
    if (statistics && statistics.length > 0) {
      setCounts(statistics.map(() => 0));
    }
  }, [statistics]);

  useEffect(() => {
    if (!statistics || statistics.length === 0) return;

    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((val, i) => {
          if (!statistics[i]) return val;
          const increment = statistics[i].number / 30;
          if (val < statistics[i].number) {
            const next = val + increment;
            return next > statistics[i].number ? statistics[i].number : next;
          }
          return val;
        })
      );
    }, 50);
    return () => clearInterval(interval);
  }, [statistics]);

  if (isLoading) {
    return (
      <section className="py-16 bg-[#3D4040] grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <div className="animate-pulse">
              <div className="h-16 md:h-20 lg:h-24 bg-gray-600 rounded mb-2"></div>
              <div className="h-6 bg-gray-600 rounded"></div>
            </div>
          </div>
        ))}
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-[#3D4040] text-center">
        <p className="text-red-400">Failed to load statistics</p>
      </section>
    );
  }

  if (!statistics || statistics.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-[#3D4040] grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
      {statistics.map((item, i) => (
        <div key={i}>
          <h2 className="text-[#FFF] text-center font-[NotoSans] text-[28px] sm:text-[35px] md:text-[50px] lg:text-[80px] xl:text-[110px] not-italic font-semibold leading-[35px] sm:leading-[48px] md:leading-[68px] lg:leading-[88px] mb-2">
            {Math.round(counts[i] || 0)}
            {item.label?.toLowerCase().includes('rate') ? '%' : '+'}
          </h2>
          <p className="text-[rgba(255,_255,_255,_0.60)] text-center font-[Inter] text-[16px] sm:text-[17px] md:text-[20px] lg:text-[24px] not-italic font-normal leading-[32px]">
            {item.label}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Countdown;
