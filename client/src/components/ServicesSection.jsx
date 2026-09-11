import React from 'react';
import { SERVICES_LIST } from '../data/mockData';
import { Gem, Truck, RotateCcw, Headphones } from 'lucide-react';

export const ServicesSection = () => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'diamond':
        return <Gem size={24} strokeWidth={1.3} className="text-[#C49E59] group-hover:text-[#D8B26E] transition-colors" />;
      case 'truck':
        return <Truck size={24} strokeWidth={1.3} className="text-[#C49E59] group-hover:text-[#D8B26E] transition-colors" />;
      case 'package':
        return <RotateCcw size={24} strokeWidth={1.3} className="text-[#C49E59] group-hover:text-[#D8B26E] transition-colors" />;
      case 'headset':
        return <Headphones size={24} strokeWidth={1.3} className="text-[#C49E59] group-hover:text-[#D8B26E] transition-colors" />;
      default:
        return <Gem size={24} strokeWidth={1.3} className="text-[#C49E59]" />;
    }
  };

  return (
    <section
      id="services-section"
      aria-label="Why Choose Vast Culture"
      className="w-full bg-[#0A0908] border-y border-[#262018] text-[#FAF6EE] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-[11px] tracking-[0.3em] font-sans font-semibold uppercase text-[#D8B26E] block mb-1.5 sm:mb-2">
            The Vast Culture Promise
          </span>
          <h2
            id="services-heading"
            className="font-serif-luxury text-[#FAF6EE] font-normal tracking-tight text-2xl sm:text-3xl lg:text-4xl"
          >
            Why Choose Vast Culture?
          </h2>
          <div className="w-10 h-[1px] bg-[#D8B26E] mx-auto mt-3" />
        </div>

        {/* Four Service Blocks: 2x2 grid on mobile/small screens, 4 columns on lg screens */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8">
          {SERVICES_LIST.map((service, idx) => (
            <div
              key={service.id}
              id={`service-card-${idx + 1}`}
              className="bg-[#14120F] border border-[#262018] p-4 sm:p-6 text-center flex flex-col items-center justify-start group hover:border-[#D8B26E]/70 hover:shadow-lg transition-all duration-300 rounded-xs"
            >
              {/* Icon Container with subtle gold halo */}
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#1C1813] border border-[#3A3125] flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#25201A] transition-colors">
                {getIcon(service.iconName)}
              </div>

              {/* Title */}
              <h3 className="font-sans font-semibold tracking-[0.14em] text-[#FAF6EE] group-hover:text-[#E5C378] uppercase mb-1.5 sm:mb-2 text-[11px] sm:text-xs lg:text-[13px] transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[#C5BCAD] font-sans font-light leading-relaxed text-[10px] sm:text-xs lg:text-[13px]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
