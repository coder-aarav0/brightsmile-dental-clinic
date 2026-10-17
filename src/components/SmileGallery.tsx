import React, { useState, useRef, useCallback } from 'react';
import { Sparkle, ArrowsLeftRight, MagnifyingGlass, CheckCircle } from '@phosphor-icons/react';

export const SmileGallery: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(5, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(95, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(5);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(95);
    }
  };

  return (
    <section className="smile-gallery-section">
      <div className="container">
        <div className="text-center">
          <div className="section-badge">
            <Sparkle size={14} weight="fill" />
            <span>Clinical Results & Transformations</span>
          </div>
          <h2 className="section-title">See The BrightSmile Difference</h2>
          <p className="section-subtitle">
            Slide horizontally to explore our real before & after patient smile makeovers, achieved with single-sitting laser whitening and invisible aligners.
          </p>
        </div>

        <div className="comparison-wrapper">
          <div
            className="comparison-slider-container"
            ref={containerRef}
            onMouseDown={() => { isDragging.current = true; }}
            onMouseUp={() => { isDragging.current = false; }}
            onMouseLeave={() => { isDragging.current = false; }}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* Before Image (Base) */}
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80"
              alt="Before Dental Whitening Treatment"
              className="comparison-image-before"
            />

            {/* After Image (Clipped) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80"
                alt="After Dental Whitening Treatment"
                className="comparison-image-after"
              />
            </div>

            {/* Drag Handle Divider */}
            <div
              className="comparison-slider-handle"
              style={{ left: `${sliderPosition}%` }}
              role="slider"
              tabIndex={0}
              aria-label="Before and after teeth whitening comparison slider"
              aria-valuenow={Math.round(sliderPosition)}
              aria-valuemin={5}
              aria-valuemax={95}
              onKeyDown={handleKeyDown}
            >
              <div className="handle-circle">
                <ArrowsLeftRight size={20} weight="bold" />
              </div>
            </div>
          </div>

          <div className="slider-labels-row">
            <div className="slider-label-pill">
              <CheckCircle size={16} weight="fill" color="#1976d2" />
              <span><strong>After:</strong> 6 Shades Brighter, Polished Enamel</span>
            </div>
            <div className="slider-label-pill">
              <MagnifyingGlass size={16} weight="bold" color="#7187a0" />
              <span><strong>Before:</strong> Staining & Surface Enamel Discoloration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
