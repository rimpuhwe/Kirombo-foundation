import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import CarouselDots from "@/components/ui/CarouselDots";
import { testimonials } from "@/components/testimonialsData";

const TestimonialCarousel: React.FC = () => {
  const [current, setCurrent] = React.useState(0);
  const apiRef = React.useRef<any>(null);

  React.useEffect(() => {
    // On mobile, auto-advance every 20s; on desktop, 50s
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const interval = setInterval(
      () => {
        if (apiRef.current) apiRef.current.scrollNext();
      },
      isMobile ? 20000 : 50000
    );
    return () => clearInterval(interval);
  }, []);

  const handleSetApi = (api: any) => {
    apiRef.current = api;
    if (api) {
      const onSelect = () => setCurrent(api.selectedScrollSnap());
      api.on("select", onSelect);
      onSelect();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 mb-10">
      <h3 className="text-3xl md:text-4xl font-extrabold mb-8 text-orange text-left">
        Voices from the Program
      </h3>
      {/* Desktop: 3 at a time, Mobile: 1 at a time */}
      <div className="hidden md:block relative">
        <Carousel
          opts={{ loop: true, align: "start" }}
          setApi={handleSetApi}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((t, idx) => (
              <CarouselItem
                key={idx}
                className="md:basis-1/2 px-4 flex flex-col items-start justify-center h-full"
              >
                <span className="text-orange-500 text-6xl mb-4">
                  <i className="fa fa-quote-left" aria-hidden="true"></i>
                </span>
                <blockquote className="italic text-xl text-left text-gray-700 mb-4 leading-relaxed w-full max-w-full">
                  {t.quote}
                </blockquote>
                <span className="block text-left text-base font-semibold text-primary mt-2 w-full truncate">
                  {t.author}
                </span>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 md:-left-8 top-1/2 -translate-y-1/2 z-10 !bg-orange-500 !border-orange-500 !text-white !shadow-lg !w-12 !h-12 hover:!bg-orange-600 hover:!border-orange-600" />
          <CarouselNext className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 z-10 !bg-orange-500 !border-orange-500 !text-white !shadow-lg !w-12 !h-12 hover:!bg-orange-600 hover:!border-orange-600" />
        </Carousel>
      </div>
      <div className="block md:hidden">
        <Carousel
          opts={{ loop: true }}
          setApi={handleSetApi}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((t, idx) => (
              <CarouselItem
                key={idx}
                className="w-full px-4 flex flex-col items-start justify-center h-full"
              >
                <span className="text-orange-500 text-6xl mb-4">
                  <i className="fa fa-quote-left" aria-hidden="true"></i>
                </span>
                <blockquote className="italic text-xl text-left text-gray-700 mb-4 leading-relaxed w-full max-w-full">
                  {t.quote}
                </blockquote>
                <span className="block text-left text-base font-semibold text-primary mt-2 w-full truncate">
                  {t.author}
                </span>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* Hide left/right buttons on mobile */}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
