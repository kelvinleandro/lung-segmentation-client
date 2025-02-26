import { useState, useEffect, ReactNode } from 'react';

interface HeroSliderProps {
  children: ReactNode[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ children: slides, autoSlide = true, autoSlideInterval = 5000 }) => {
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    if (!autoSlide) return;

    const slideInterval = setInterval(() => {
      setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
    }, autoSlideInterval);

    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, slides.length]);

  return (
    <div className="relative w-64 h-64 rounded-full overflow-hidden flex items-center justify-center">
      {/* Container dos slides (fixo, sem border-radius individual) */}
      <div
        className="flex w-full h-full transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-64 h-64 flex-shrink-0 flex items-center justify-center">
            {slide}
          </div>
        ))}
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-4 flex items-center justify-center w-full gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`transition-all w-3 h-3 bg-white rounded-full ${curr === i ? 'p-2' : 'bg-opacity-50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
