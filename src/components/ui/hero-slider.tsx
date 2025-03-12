import { useState, useEffect, ReactNode } from "react";

interface HeroSliderProps {
  children: ReactNode[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const HeroSlider: React.FC<HeroSliderProps> = ({
  children: slides,
  autoSlide = true,
  autoSlideInterval = 5000,
}) => {
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    if (!autoSlide) return;

    const slideInterval = setInterval(() => {
      setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
    }, autoSlideInterval);

    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, slides.length]);

  const goToSlide = (index: number) => {
    setCurr(index);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Slider Container */}
      <div className="relative w-64 h-64 rounded-full overflow-hidden flex items-center justify-center">
        {/* Slides */}
        <div
          className="flex w-full h-full transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-64 h-64 flex-shrink-0 flex items-center justify-center"
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* Indicators (Dots) */}
      <div className="flex items-center justify-center w-full gap-2 mt-4">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => goToSlide(i)}
            className={`transition-all w-3 h-3 border border-white rounded-full cursor-pointer ${
              curr === i ? "p-1 bg-white" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
