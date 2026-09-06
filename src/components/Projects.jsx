import React, { useRef } from 'react';
import './Projects.css';
import { TennisBallSVG, FootballSVG, F1CarSVG } from './ProjectTravelerIcons';
import { ExternalLink, Code } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PROJECTS_DATA = [
  {
    id: 1,
    index: "01",

    name: "BasicNotes",
    description: "Note-taking application for Android written in Kotlin, featuring a built-in AI assistant powered by Retrieval-Augmented Generation (RAG) to query, synthesize, and answer questions about your notes.",
    tags: ["Kotlin", "Android", "RAG", "LLM", "Vector Search"],
    demo: "https://github.com/UK2011/BasicNotes",
    github: "https://github.com/UK2011/BasicNotes",
  },
  {
    id: 2,
    index: "02",

    name: "React Hover",
    description: "Hover on elements present in your React application to get easily redirected to the exact lines in code where the element is taken from.",
    tags: ["React", "HTML", "CSS", "JavaScript"],
    demo: " https://github.com/UK2011/fehelper",
    github: "https://github.com/UK2011/fehelper",
  },
  {
    id: 3,
    index: "03",

    name: "SLM Contextual RAG Pipeline",
    description: "Document ingestion and contextual chunking engine using IBM Docling, local LLM enrichment",
    tags: ["Python", "Docling", "RAG", "LLM", "Kafka", "Vector Search"],
    demo: "https://github.com/UK2011/SLM_Processing",
    github: "https://github.com/UK2011/SLM_Processing",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const travelerRef = useRef(null);

  useGSAP(
    () => {
      const activePath = document.querySelector('#spline-path-active');
      const traveler = travelerRef.current;
      const svgEl = svgRef.current;
      const tennisEl = document.querySelector('#traveler-tennis');
      const footballEl = document.querySelector('#traveler-football');
      const f1El = document.querySelector('#traveler-f1');
      const card1 = document.querySelector('#project-card-1');
      const card2 = document.querySelector('#project-card-2');
      const card3 = document.querySelector('#project-card-3');

      if (!activePath || !traveler || !svgEl || !tennisEl || !footballEl || !f1El) return;

      const pathLength = activePath.getTotalLength();
      gsap.set(activePath, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        stroke: '#bef264',
        filter: 'drop-shadow(0 0 12px rgba(190, 242, 100, 0.85))',
      });

      gsap.set(tennisEl, { opacity: 1, scale: 1, transformOrigin: 'center center' });
      gsap.set(footballEl, { opacity: 0, scale: 0.1, transformOrigin: 'center center' });
      gsap.set(f1El, { opacity: 0, scale: 0.1, transformOrigin: 'center center' });

      gsap.set([card1, card2, card3], {
        opacity: 0.8,
      });

      const updateTravelerPos = (progressRatio) => {
        const currentLen = Math.max(0, Math.min(progressRatio, 1)) * pathLength;
        const pt = activePath.getPointAtLength(currentLen);
        const svgRect = svgEl.getBoundingClientRect();

        const posX = (pt.x / 1000) * svgRect.width;
        const posY = (pt.y / 1200) * svgRect.height;

        gsap.set(traveler, {
          x: posX,
          y: posY,
        });

        activePath.style.strokeDashoffset = pathLength - currentLen;
      };

      updateTravelerPos(0);

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 65%',
          scrub: 1.6,
          onUpdate: (self) => {
            updateTravelerPos(self.progress);
          },
        },
      });

      const bounceKeyframes = [
        { y: -26, scaleX: 0.92, scaleY: 1.08, duration: 0.035, ease: 'power1.out' },
        { y: 0, scaleX: 1.15, scaleY: 0.85, duration: 0.035, ease: 'power1.in' },
        { y: -22, scaleX: 0.94, scaleY: 1.06, duration: 0.035, ease: 'power1.out' },
        { y: 0, scaleX: 1.12, scaleY: 0.88, duration: 0.035, ease: 'power1.in' },
        { y: -18, scaleX: 0.95, scaleY: 1.05, duration: 0.035, ease: 'power1.out' },
        { y: 0, scaleX: 1.10, scaleY: 0.90, duration: 0.035, ease: 'power1.in' },
        { y: -14, scaleX: 0.97, scaleY: 1.03, duration: 0.035, ease: 'power1.out' },
        { y: 0, scaleX: 1.05, scaleY: 0.95, duration: 0.035, ease: 'power1.in' },
        { y: 0, scaleX: 1, scaleY: 1, duration: 0.05, ease: 'power1.out' },
      ];

      bounceKeyframes.forEach((kf, idx) => {
        const timeOffset = idx * 0.035;
        if (timeOffset < 0.32) {
          masterTl.to(
            tennisEl,
            {
              y: kf.y,
              scaleX: kf.scaleX,
              scaleY: kf.scaleY,
              ease: kf.ease,
              duration: kf.duration,
            },
            timeOffset
          );
        }
      });

      if (card1) {
        masterTl
          .to(card1, { opacity: 1, duration: 0.12, ease: 'power2.out' }, 0.04)
          .to(card1, { opacity: 0.8, duration: 0.08, ease: 'power2.in' }, 0.30);
      }

      masterTl
        .to(
          tennisEl,
          {
            opacity: 0,
            scale: 0.1,
            duration: 0.05,
            ease: 'power2.in',
          },
          0.31
        )
        .to(
          footballEl,
          {
            opacity: 1,
            scale: 1,
            duration: 0.06,
            ease: 'back.out(2)',
          },
          0.33
        )
        .to(
          activePath,
          {
            stroke: '#38bdf8',
            filter: 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.85))',
            duration: 0.06,
          },
          0.33
        );

      masterTl.to(
        footballEl,
        {
          rotation: 720,
          duration: 0.33,
          ease: 'none',
        },
        0.33
      );

      if (card2) {
        masterTl
          .to(card2, { opacity: 1, duration: 0.12, ease: 'power2.out' }, 0.38)
          .to(card2, { opacity: 0.8, duration: 0.08, ease: 'power2.in' }, 0.62);
      }

      masterTl
        .to(
          footballEl,
          {
            opacity: 0,
            scale: 0.1,
            duration: 0.05,
            ease: 'power2.in',
          },
          0.64
        )
        .to(
          f1El,
          {
            opacity: 1,
            scale: 1,
            duration: 0.06,
            ease: 'back.out(2)',
          },
          0.66
        )
        .to(
          activePath,
          {
            stroke: '#ef4444',
            filter: 'drop-shadow(0 0 14px rgba(239, 68, 68, 0.9))',
            duration: 0.06,
          },
          0.66
        );

      masterTl
        .fromTo(
          f1El,
          { rotation: 35 },
          {
            rotation: -25,
            duration: 0.17,
            ease: 'power1.inOut',
          },
          0.66
        )
        .to(
          f1El,
          {
            rotation: 20,
            duration: 0.17,
            ease: 'power1.out',
          },
          0.83
        );

      if (card3) {
        masterTl.to(card3, { opacity: 1, duration: 0.14, ease: 'power2.out' }, 0.70);
      }

      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <section id="projects" ref={sectionRef} className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <span className="projects-subtitle">// Selected Works</span>
          <h2 className="projects-title">Featured Projects</h2>
        </div>

        <div className="spline-svg-wrapper">
          <svg
            ref={svgRef}
            viewBox="0 0 1000 1200"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
          >
            <path
              id="spline-path-bg"
              className="spline-track-bg"
              d="M 250 80 C 750 150, 850 450, 480 600 C 100 750, 200 1050, 780 1120"
            />
            <path
              id="spline-path-active"
              className="spline-track-active"
              d="M 250 80 C 750 150, 850 450, 480 600 C 100 750, 200 1050, 780 1120"
            />
          </svg>

          <div ref={travelerRef} id="spline-traveler" className="spline-traveler-node">
            <div className="traveler-inner">
              <div className="traveler-graphic graphic-tennis" id="traveler-tennis">
                <TennisBallSVG size={50} />
              </div>
              <div className="traveler-graphic graphic-football" id="traveler-football">
                <FootballSVG size={52} />
              </div>
              <div className="traveler-graphic graphic-f1" id="traveler-f1">
                <F1CarSVG size={78} />
              </div>
            </div>
          </div>
        </div>

        <div className="projects-list">
          {PROJECTS_DATA.map((project, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={project.id}
                className={`project-row ${isEven ? 'reverse' : ''}`}
                id={`project-row-${index + 1}`}
              >
                <div className="project-card" id={`project-card-${index + 1}`}>
                  <div className="project-header-bar">
                    <span className="project-index">{project.index}</span>

                  </div>
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="project-btn primary"
                    >
                      View Live <ExternalLink size={15} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="project-btn secondary"
                    >
                      Source Code <Code size={15} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
