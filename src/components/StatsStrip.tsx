import React, { useState, useEffect, useRef } from 'react';
import { Medal, Smiley, ThumbsUp, ShieldCheck } from '@phosphor-icons/react';

interface CountUpProps {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  startTrigger: boolean;
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1800,
  startTrigger,
}) => {
  const [val, setVal] = useState<number>(0);

  useEffect(() => {
    if (!startTrigger) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(eased * end);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setVal(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [startTrigger, end, duration]);

  const formatted = decimals > 0
    ? val.toFixed(decimals)
    : Math.floor(val).toLocaleString();

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export const StatsStrip: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="stats-strip-section" aria-label="Clinical Metrics and Patient Trust">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-iconbox">
              <Medal size={28} weight="duotone" />
            </div>
            <div className="stat-content">
              <div className="stat-number">
                <CountUp end={15} suffix="+" startTrigger={isInView} />
              </div>
              <div className="stat-label">Years of Surgical Mastery</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-iconbox">
              <Smiley size={28} weight="duotone" />
            </div>
            <div className="stat-content">
              <div className="stat-number">
                <CountUp end={10000} suffix="+" startTrigger={isInView} />
              </div>
              <div className="stat-label">Confident Smiles Restored</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-iconbox">
              <ThumbsUp size={28} weight="duotone" />
            </div>
            <div className="stat-content">
              <div className="stat-number">
                <CountUp end={99.4} decimals={1} suffix="%" startTrigger={isInView} />
              </div>
              <div className="stat-label">Verified Patient Satisfaction</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-iconbox">
              <ShieldCheck size={28} weight="duotone" />
            </div>
            <div className="stat-content">
              <div className="stat-number">
                <CountUp end={100} suffix="%" startTrigger={isInView} />
              </div>
              <div className="stat-label">Class-B Sterile Protocols</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
