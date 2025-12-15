import React from "react";

interface CarouselDotsProps {
  count: number;
  current: number;
  onSelect?: (index: number) => void;
}

const CarouselDots: React.FC<CarouselDotsProps> = ({
  count,
  current,
  onSelect,
}) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onSelect && onSelect(i)}
          className={`transition-all duration-300 focus:outline-none
            ${
              i === current
                ? "bg-orange-500 w-8 h-3 rounded-full"
                : "bg-background border border-secondary/60 w-3 h-3 rounded-full"
            }`}
        />
      ))}
    </div>
  );
};

export default CarouselDots;
