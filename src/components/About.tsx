import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h2 className="title">About Deepan Kumar</h2>
        <p className="para">
          Deepan Kumar is a Staff Engineer at G2, bringing over 10 years of expertise in
          building scalable, high-performance web applications. Specializing in React, TypeScript,
          and Ruby on Rails, Deepan has architected microservices systems that power enterprise-level
          solutions serving millions of users.
        </p>
        <p className="para">
          As a RubyConf India 2025 speaker, Deepan Kumar presented groundbreaking work on
          "AI at Runtime - Self-Healing Apps," demonstrating how applications can actively
          adapt and recover using artificial intelligence. His innovative approach to building
          resilient systems has earned him recognition including the Most Valuable Professional
          Award at G2 in 2024.
        </p>
        <p className="para">
          Beyond engineering, Deepan Kumar is passionate about knowledge sharing and mentorship.
          He writes technical articles on Medium covering software engineering, AI, and system design,
          and mentors developers on Topmate, helping them navigate their careers and master
          technologies like Ruby on Rails and system architecture.
        </p>
      </div>
    </div>
  );
};

export default About;
