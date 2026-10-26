import React, { useRef, useEffect, useState } from "react";
import { Users, GraduationCap, Heart, Sprout } from "lucide-react";

type Stat = {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
};

const stats: Stat[] = [
  { icon: Users, value: 5000, label: "Lives Impacted", suffix: "+" },
  {
    icon: GraduationCap,
    value: 150,
    label: "Students Supported",
    suffix: "+",
  },
  { icon: Heart, value: 1002, label: "Livestock Distributed", suffix: "+" },
  { icon: Sprout, value: 500, label: "Communities Served", suffix: "+" },
];

// Animated counter hook
function useCountUp(target: number, duration = 1800, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setCount(target);
      return;
    }
    let startTime: number | null = null;
    function animate(now: number) {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    }
    requestAnimationFrame(animate);
    // eslint-disable-next-line
  }, [target, duration, start]);
  return count;
}

const ImpactStats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-primary text-white"
      aria-labelledby="impact-heading"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            id="impact-heading"
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Together, we're making a real difference in the lives of thousands
            across East Africa.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const count = useCountUp(stat.value, 1800, inView);
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center"
                aria-label={stat.label}
              >
                <Icon
                  aria-hidden="true"
                  className="mb-5 text-orange-500"
                  size={60}
                />
                <span className="text-4xl font-extrabold tabular-nums mb-4">
                  {count.toLocaleString()}
                  {stat.suffix}
                </span>
                <span className="text-lg font-medium text-white/90">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
