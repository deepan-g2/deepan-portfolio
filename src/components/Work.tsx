import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollToPlugin);

const Work = () => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    let translateX: number = 0;
    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        pinType: !ScrollTrigger.isTouch ? "transform" : "fixed",
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      duration: 40,
      delay: 0.2,
    });

    timelineRef.current = timeline;
  }, []);

  const handleCarouselClick = (direction: "left" | "right") => {
    const scrollTrigger = ScrollTrigger.getById("work");
    if (!scrollTrigger) return;

    // Much smaller scroll amount for subtle movement
    const scrollAmount = direction === "left" ? -50 : 50;
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    let targetScroll = currentScroll + scrollAmount;

    // Clamp scroll position to valid ScrollTrigger range
    const minScroll = scrollTrigger.start;
    const maxScroll = scrollTrigger.end;

    // Ensure we stay within bounds
    if (targetScroll < minScroll) {
      targetScroll = minScroll;
    } else if (targetScroll > maxScroll) {
      targetScroll = maxScroll;
    }

    // Smooth scroll animation
    gsap.to(window, {
      scrollTo: {
        y: targetScroll,
        autoKill: false,
      },
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };
  return (
    <div className="work-section" id="work">
      <button
        className="carousel-arrow carousel-arrow-left work-arrow-left"
        onClick={() => handleCarouselClick("left")}
        aria-label="Previous achievement"
        data-cursor="disable"
      >
        <MdArrowBackIos />
      </button>

      <button
        className="carousel-arrow carousel-arrow-right work-arrow-right"
        onClick={() => handleCarouselClick("right")}
        aria-label="Next achievement"
        data-cursor="disable"
      >
        <MdArrowForwardIos />
      </button>

      <div className="work-container section-container">
        <h2>
          Awards & <span>Achievements</span>
        </h2>
        <div className="work-flex">
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>
                <div>
                  <h4>Most Valuable Professional Award</h4>
                  <p>G2 - 2024</p>
                </div>
              </div>
              <h4>Achievement highlights</h4>
              <p>Recognized for outstanding professional contributions, team collaboration, and technical leadership excellence at G2</p>
            </div>
            <WorkImage image="/images/mvp.jpeg" alt="Most Valuable Professional Award" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>AI at Runtime - Self-Healing Apps</h4>
                  <p>RubyConfIndia2025 Speaker</p>
                </div>
              </div>
              <h4>Achievement highlights</h4>
              <p>Delivered keynote on how applications can actively adapt, recover and heal themselves during runtime using AI</p>
            </div>
            <WorkImage image="/images/conf.jpeg" alt="RubyConf India Speaker" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>
                <div>
                  <h4>3rd Place Winner</h4>
                  <p>G2 Hackathon FY25</p>
                </div>
              </div>
              <h4>Achievement highlights</h4>
              <p>Achieved 3rd place in company-wide hackathon, collaborating with brilliant minds to tackle challenging technical problems</p>
            </div>
            <WorkImage image="/images/jarvis.jpeg" alt="G2 Hackathon Winner" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>04</h3>
                <div>
                  <h4>AI and Engineering Panel Expert</h4>
                  <p>RubyConfIndia2025 Panelist</p>
                </div>
              </div>
              <h4>Achievement highlights</h4>
              <p>Participated in expert panel discussion sharing insights about AI's role and impact on software engineering</p>
            </div>
            <WorkImage image="/images/panel.jpeg" alt="AI Panel Discussion" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>05</h3>
                <div>
                  <h4>Technical Mentorship Excellence</h4>
                  <p>Cross-Company Recognition</p>
                </div>
              </div>
              <h4>Achievement highlights</h4>
              <p>Now available on Topmate for Rails guidance, app scaling consultation, and tech career mentorship</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Technical Mentorship" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>06</h3>
                <div>
                  <h4>Staff Engineer Promotion</h4>
                  <p>G2 - Current Role</p>
                </div>
              </div>
              <h4>Achievement highlights</h4>
              <p>Promoted to Staff Engineer for building scalable, data-driven solutions and technical leadership in microservices</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Staff Engineer Role" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
