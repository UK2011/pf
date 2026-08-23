import { useRef, useState } from 'react';
import './Navbar.css';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

const items = [
  {
    index: "01",
    label: "Projects",
    href: "#projects"
  },
  {
    index: "02",
    label: "About",
    href: "#about"
  },
  {
    index: "03",
    label: "Contact",
    href: "#contact"
  }
];

gsap.registerPlugin(useGSAP, SplitText);

const flickerTextTo = (element, text) => {
  if (!element) return;
  element.flickerSplit?.revert();
  element.textContent = text;
  element.flickerSplit = new SplitText(element, { type: "chars" });
  gsap.fromTo(
    element.flickerSplit.chars,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.95,
      ease: "power2.inOut",
      overwrite: true,
      stagger: { amount: 0.3, from: "random" },
    }
  );
};

const Navbar = () => {
  const containerRef = useRef(null);
  const togglerRef = useRef(null);
  const tlRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(
    () => {
      const menuBg = document.querySelector(".menu-bg");
      const menuItems = document.querySelectorAll(".menu-item");

      const itemsData = [...menuItems].map((item) => {
        const indexEl = item.querySelector(".item-index");
        const firstCharEl = item.querySelector(".item-first-char");
        const trailingCharBox = item.querySelector(".item-body");
        const trailingChars = item.querySelectorAll(".item-char");
        const divider = item.querySelector(".item-end");


        const fullWidth = trailingCharBox ? trailingCharBox.scrollWidth : 0;


        if (indexEl) gsap.set(indexEl, { yPercent: 120, opacity: 0 });
        if (firstCharEl) gsap.set(firstCharEl, { yPercent: 120, opacity: 0 });
        if (trailingCharBox) gsap.set(trailingCharBox, { width: 0 });
        if (trailingChars.length) gsap.set(trailingChars, { xPercent: 80, opacity: 0 });
        if (divider) {
          gsap.set(divider, {
            scaleY: 0,
            opacity: 0,
            rotation: 20,
            transformOrigin: "center center",
          });
        }

        return {
          indexEl,
          firstCharEl,
          trailingCharBox,
          trailingChars,
          divider,
          fullWidth,
        };
      });

      // Build GSAP Timeline for Menu Expand Sequence
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        onReverseComplete: () => {
          setIsMenuOpen(false);
        },
      });

      if (menuBg) {
        tl.to(menuBg, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0);
      }

      itemsData.forEach(
        (
          {
            indexEl,
            firstCharEl,
            trailingCharBox,
            trailingChars,
            divider,
            fullWidth,
          },
          i
        ) => {
          const startTime = 0.2 + i * 0.12;

          // 1. Index number and first letter of each label appear first
          tl.to(
            [indexEl, firstCharEl],
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.55,
              ease: "power3.out",
            },
            startTime
          );

          // 2. Trailing letters appear (container width expands and characters animate in)
          if (trailingCharBox) {
            tl.to(
              trailingCharBox,
              {
                width: fullWidth,
                duration: 0.65,
                ease: "power3.inOut",
              },
              startTime + 0.35
            );
          }

          if (trailingChars && trailingChars.length) {
            tl.to(
              trailingChars,
              {
                xPercent: 0,
                opacity: 1,
                duration: 0.45,
                stagger: 0.03,
                ease: "power2.out",
              },
              startTime + 0.4
            );
          }

          // 3. Separator or end "/" appears
          if (divider) {
            tl.to(
              divider,
              {
                scaleY: 1,
                opacity: 1,
                duration: 0.4,
                ease: "power3.out",
              },
              startTime + 0.65
            );
          }
        }
      );

      tlRef.current = tl;
    },
    { scope: containerRef }
  );

  const handleToggle = () => {
    const nextState = !isMenuOpen;

    if (nextState) {
      setIsMenuOpen(true);
      tlRef.current?.play();
    } else {
      tlRef.current?.reverse();
    }

    if (togglerRef.current) {
      flickerTextTo(togglerRef.current, nextState ? "Close" : "Menu");
    }
  };

  return (
    <header ref={containerRef}>
      <button
        ref={togglerRef}
        className="nav-toggler"
        onClick={handleToggle}
        style={{
          position: "fixed",
          top: "2rem",
          right: "2rem",
          zIndex: 100,
          background: "none",
          border: "none",
          color: "var(--text-color, #e0e0ca)",
          fontSize: "1.1rem",
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        Menu
      </button>

      <nav className={`menu ${isMenuOpen ? "is-menu-open" : ""}`}>
        <div className="menu-bg"></div>

        {items.map((item) => {
          const firstLetter = item.label.charAt(0);
          const restLetters = item.label.slice(1).split("");

          return (
            <a key={item.index} className="menu-item" href={item.href}>
              <span className="item-index-wrap">
                <span className="item-index">{item.index}</span>
              </span>
              <span className="item-label-wrap">
                <span className="item-first-char">{firstLetter}</span>
                <span className="item-body">
                  {restLetters.map((char, idx) => (
                    <span key={idx} className="item-char">
                      {char}
                    </span>
                  ))}
                </span>
              </span>
              <span className="item-end"></span>
            </a>
          );
        })}
      </nav>
    </header>
  );
};

export default Navbar;