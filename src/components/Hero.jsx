import React, { useRef } from 'react';
import './Hero.css';
import { ArrowDownRight, Mail } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, SplitText);

const TECH_STACK = [
  { id: 'react', label: 'React', initialX: '12%', initialY: '18%', dotColor: '#61dafb' },
  { id: 'typescript', label: 'TypeScript', initialX: '82%', initialY: '16%', dotColor: '#3178c6' },
  { id: 'python', label: 'Python', initialX: '8%', initialY: '52%', dotColor: '#facc15' },
  { id: 'nodejs', label: 'Node.js', initialX: '86%', initialY: '48%', dotColor: '#4ade80' },
  { id: 'gsap', label: 'GSAP Motion', initialX: '20%', initialY: '80%', dotColor: '#84cc16' },
  { id: 'docker', label: 'Docker', initialX: '78%', initialY: '80%', dotColor: '#38bdf8' },
  { id: 'golang', label: 'Go', initialX: '28%', initialY: '25%', dotColor: '#00add8' },
  { id: 'nextjs', label: 'Next.js', initialX: '70%', initialY: '28%', dotColor: '#ffffff' },
  { id: 'aws', label: 'AWS', initialX: '15%', initialY: '66%', dotColor: '#fb923c' },
  { id: 'rust', label: 'Rust', initialX: '85%', initialY: '66%', dotColor: '#f97316' },
  { id: 'graphql', label: 'GraphQL', initialX: '38%', initialY: '14%', dotColor: '#e10098' },
  { id: 'postgres', label: 'PostgreSQL', initialX: '62%', initialY: '85%', dotColor: '#336791' },
];

export default function Hero() {
  const heroRef = useRef(null);
  const techCloudRef = useRef(null);
  const contentRef = useRef(null);
  const shockwaveRef = useRef(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      const pills = gsap.utils.toArray('.tech-tag-pill');
      const nameEl = document.querySelector('#hero-name');
      const roleEl = document.querySelector('#hero-role');
      const descEl = document.querySelector('.hero-description');
      const ctaEl = document.querySelector('.hero-cta-group');
      const shockwave = shockwaveRef.current;

      if (!hero || !pills.length || !nameEl || !roleEl) return;

      const nameSplit = new SplitText(nameEl, { type: 'chars' });
      const roleSplit = new SplitText(roleEl, { type: 'words,chars' });

      const extraEls = [descEl, ctaEl].filter(Boolean);

      gsap.set(nameSplit.chars, { opacity: 0, y: 40, rotationX: -60 });
      gsap.set(roleSplit.chars, { opacity: 0, y: 20 });
      if (extraEls.length) gsap.set(extraEls, { opacity: 0, y: 20 });
      if (shockwave) gsap.set(shockwave, { scale: 0, opacity: 0 });

      pills.forEach((pill, i) => {
        gsap.to(pill, {
          y: `+=${i % 2 === 0 ? 8 : -8}`,
          duration: 1.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });

      const heroRect = hero.getBoundingClientRect();
      const centerX = heroRect.width / 2;
      const centerY = heroRect.height / 2;

      const introTl = gsap.timeline({
        delay: 0.5,
        defaults: { ease: 'power3.inOut' },
      });

      pills.forEach((pill, idx) => {
        const pillRect = pill.getBoundingClientRect();
        const pillCenterX = pillRect.left - heroRect.left + pillRect.width / 2;
        const pillCenterY = pillRect.top - heroRect.top + pillRect.height / 2;

        const deltaX = centerX - pillCenterX;
        const deltaY = centerY - pillCenterY;

        introTl.to(
          pill,
          {
            x: deltaX,
            y: deltaY,
            scale: 0,
            opacity: 0,
            duration: 0.85,
            ease: 'power4.in',
          },
          0.05 + (idx % 3) * 0.04
        );
      });

      if (shockwave) {
        introTl
          .to(
            shockwave,
            {
              opacity: 1,
              scale: 1,
              duration: 0.12,
              ease: 'power2.out',
            },
            0.92
          )
          .to(
            shockwave,
            {
              scale: 3.2,
              opacity: 0,
              duration: 0.7,
              ease: 'power2.out',
            },
            1.04
          );
      }

      introTl
        .to(
          nameSplit.chars,
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.85,
            stagger: 0.05,
            ease: 'back.out(1.8)',
          },
          1.0
        )
        .to(
          roleSplit.chars,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.02,
            ease: 'power2.out',
          },
          1.2
        );

      if (extraEls.length) {
        introTl.to(
          extraEls,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power3.out',
          },
          1.35
        );
      }

      if (techCloudRef.current) {
        introTl.set(techCloudRef.current, { display: 'none' }, 1.1);
      }

      return () => {
        nameSplit.revert();
        roleSplit.revert();
      };
    },
    { scope: heroRef }
  );

  return (
    <section ref={heroRef} id="hero" className="hero-section">
      <div className="hero-ambient-glow"></div>
      <div ref={shockwaveRef} className="hero-shockwave"></div>

      <div ref={techCloudRef} className="tech-cloud-container">
        {TECH_STACK.map((tech) => (
          <div
            key={tech.id}
            className="tech-tag-pill"
            id={`tech-tag-${tech.id}`}
            style={{
              left: tech.initialX,
              top: tech.initialY,
            }}
          >
            <span className="tech-tag-dot" style={{ backgroundColor: tech.dotColor }}></span>
            <span>{tech.label}</span>
          </div>
        ))}
      </div>

      <div ref={contentRef} className="hero-content">
        <h1 className="hero-name-title" id="hero-name">
          Udbhav
        </h1>

        <h2 className="hero-role-subtitle" id="hero-role">
          Software Engineer
        </h2>

        <p className="hero-description">
          Crafting high-performance web systems, distributed architectures, and immersive interactive digital experiences.
        </p>

        <div className="hero-cta-group">
          <a href="#projects" className="hero-btn primary">
            Explore Projects <ArrowDownRight size={16} />
          </a>
          <a href="#contact" className="hero-btn secondary">
            Get In Touch <Mail size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}