import React from "react";
import { testimonials } from "./testimonialsData";

const TestimonialCard: React.FC<{ quote: string; author: string }> = ({ quote, author }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full justify-between border border-orange-100">
    <div className="flex-1 flex flex-col justify-center items-center">
      <span className="text-orange-500 text-3xl mb-2">
        <i className="fa fa-quote-left" aria-hidden="true"></i>
      </span>
      <blockquote className="italic text-lg text-center text-gray-700 mb-4 leading-relaxed">
        {quote}
      </blockquote>
    </div>
    <span className="block text-right text-sm font-semibold text-orange-600 mt-2">{author}</span>
  </div>
);

export default TestimonialCard;
