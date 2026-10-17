import React from 'react';
import { ShieldCheck, Scan, Lightning, Cpu, Sparkle } from '@phosphor-icons/react';

export const Technology: React.FC = () => {
  return (
    <section id="technology" className="technology-section">
      <div className="container">
        <div className="text-center">
          <div className="section-badge">
            <Sparkle size={15} weight="fill" />
            <span>Hospital-Grade Sterilization & Diagnostic Tech</span>
          </div>
          <h2 className="section-title">Zero Fear. 100% Biologically Safe.</h2>
          <p className="section-subtitle">
            We invest in state-of-the-art diagnostic and clinical equipment so your visits are faster, completely painless, and biologically safe.
          </p>
        </div>

        <div className="tech-grid">
          <div className="tech-card">
            <div className="tech-iconbox">
              <ShieldCheck size={28} weight="duotone" />
            </div>
            <div className="tech-meta-tag">100% Spore Destruction</div>
            <h3 className="tech-title">Class-B Autoclave Sterilization</h3>
            <p className="tech-desc">
              The highest medical standard of vacuum autoclaving that destroys 100% of bacterial and viral spores. Instrument packs are vacuum-sealed and opened only in your presence.
            </p>
          </div>

          <div className="tech-card">
            <div className="tech-iconbox">
              <Scan size={28} weight="duotone" />
            </div>
            <div className="tech-meta-tag">60-Second Digital Scan</div>
            <h3 className="tech-title">3D Intraoral Scanner</h3>
            <p className="tech-desc">
              No more uncomfortable gagging or sticky impression putty. Our optical 3D scanner renders a micrometric 3D digital model of your teeth in under 60 seconds.
            </p>
          </div>

          <div className="tech-card">
            <div className="tech-iconbox">
              <Lightning size={28} weight="duotone" />
            </div>
            <div className="tech-meta-tag">Sub-Sensory Anesthesia</div>
            <h3 className="tech-title">Computerized Pain-Free Anesthesia</h3>
            <p className="tech-desc">
              Microprocessor-guided flow controls anesthetic delivery below the human pain threshold, eliminating needle pinch and facial numbness after treatment.
            </p>
          </div>

          <div className="tech-card">
            <div className="tech-iconbox">
              <Cpu size={28} weight="duotone" />
            </div>
            <div className="tech-meta-tag">90% Less Radiation</div>
            <h3 className="tech-title">Ultra Low-Dose Digital OPG</h3>
            <p className="tech-desc">
              High-definition panoramic digital x-rays that emit 90% less radiation than traditional film, providing instant diagnostic views on chairside HD monitors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
