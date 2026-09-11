import React, { useState } from 'react';
import { REVIEWS_LIST } from '../data/mockData';
import { Star, CheckCircle2, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const ReviewsSection = () => {
  const [mobileIndex, setMobileIndex] = useState(0);

  const handlePrev = () => {
    setMobileIndex((prev) => (prev === 0 ? REVIEWS_LIST.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setMobileIndex((prev) => (prev === REVIEWS_LIST.length - 1 ? 0 : prev + 1));
  };

  const currentMobileReview = REVIEWS_LIST[mobileIndex];

  return (
    <section 
      id="customer-reviews"
      aria-label="Customer Testimonials"
      className="w-full bg-[#FAF7F2] border-t border-[#EAE2D2] text-[#1E1B18] py-14 sm:py-18 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <span className="text-[10px] sm:text-[11px] tracking-[0.3em] font-sans font-semibold uppercase text-[#9E7A32] block mb-1.5 sm:mb-2">
            Client Impressions
          </span>
          <h2 
            id="reviews-heading"
            className="font-serif-luxury text-[#121110] font-normal tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Loved by Thousands
          </h2>
          <div className="flex items-center justify-center gap-1 mt-2 text-[#D8B26E]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill="#D8B26E" strokeWidth={0} />
            ))}
            <span className="text-xs text-[#5E574B] font-sans ml-1.5">4.9 / 5.0 (2,400+ Verified Reviews)</span>
          </div>
          <div className="w-10 h-[1px] bg-[#D8B26E] mx-auto mt-3" />
        </div>

        {/* Desktop & Tablet Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {REVIEWS_LIST.map((review) => (
            <div
              key={review.id}
              id={`review-card-${review.id}`}
              className="bg-white border border-[#E8DFC8] p-6 lg:p-7 flex flex-col justify-between hover:border-[#D8B26E] hover:shadow-md transition-all duration-300 relative group"
            >
              <Quote size={28} className="text-[#EBD5A0] opacity-40 absolute top-5 right-5 pointer-events-none" />

              <div>
                {/* 5 Gold Stars */}
                <div className="flex text-[#D8B26E] mb-3.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={13} fill="#D8B26E" strokeWidth={0} />
                  ))}
                </div>

                {/* Short Review */}
                <p className="font-serif-luxury italic text-base lg:text-[17px] text-[#2C2720] leading-relaxed mb-6 font-normal">
                  {review.content}
                </p>
              </div>

              {/* Customer Profile Row */}
              <div className="pt-4 border-t border-[#F2ECE1] flex items-center gap-3.5">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 lg:w-11 lg:h-11 rounded-full object-cover border border-[#D8B26E]"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-sans font-semibold text-xs tracking-wider text-[#121110]">
                      {review.name}
                    </h3>
                    {review.verified && (
                      <CheckCircle2 size={13} className="text-[#8C6D2D]" />
                    )}
                  </div>
                  <span className="text-[10px] lg:text-[11px] text-[#786F61] font-sans">
                    {review.location} · {review.productName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipeable Carousel Card */}
        <div className="block md:hidden">
          <div className="bg-white border border-[#E8DFC8] p-5 sm:p-6 relative shadow-xs">
            <Quote size={24} className="text-[#EBD5A0] opacity-50 absolute top-4 right-4 pointer-events-none" />

            <div className="flex text-[#D8B26E] mb-3">
              {[...Array(currentMobileReview.rating)].map((_, i) => (
                <Star key={i} size={13} fill="#D8B26E" strokeWidth={0} />
              ))}
            </div>

            <p className="font-serif-luxury italic text-base text-[#2C2720] leading-relaxed mb-5 font-normal">
              "{currentMobileReview.content}"
            </p>

            <div className="pt-3.5 border-t border-[#F2ECE1] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={currentMobileReview.avatar}
                  alt={currentMobileReview.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#D8B26E]"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-sans font-semibold text-xs text-[#121110]">
                      {currentMobileReview.name}
                    </h3>
                    {currentMobileReview.verified && (
                      <CheckCircle2 size={12} className="text-[#8C6D2D]" />
                    )}
                  </div>
                  <span className="text-[10px] text-[#786F61] font-sans">
                    {currentMobileReview.location}
                  </span>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-7 h-7 rounded-full border border-[#D8CEBA] bg-[#FAF7F2] hover:bg-[#D8B26E] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-7 h-7 rounded-full border border-[#D8CEBA] bg-[#FAF7F2] hover:bg-[#D8B26E] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-1.5 mt-4">
            {REVIEWS_LIST.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  mobileIndex === i ? 'w-5 bg-[#D8B26E]' : 'w-1.5 bg-[#D5CABB]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
