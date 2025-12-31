import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h1>
          Deepan Kumar's Career <span>&</span>
          <br /> Professional Experience
        </h1>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer</h4>
                <h5>DXC Technology</h5>
              </div>
              <h3>2015</h3>
            </div>
            <p>
              Started as a Software Developer at DXC Technology, working on enterprise-level applications
              for Fortune 500 clients. Gained comprehensive expertise in full-stack development and built
              strong foundations in software engineering principles and best practices.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Ruby on Rails Developer</h4>
                <h5>myBataz</h5>
              </div>
              <h3>2018</h3>
            </div>
            <p>
              Progressed to Lead Backend Developer at myBataz, specializing in Ruby on Rails development.
              Built high-traffic e-commerce platform with PostgreSQL optimization and Redis caching,
              reducing response times by 40% and significantly improving scalability during peak loads.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Backend Developer</h4>
                <h5>MEDICI</h5>
              </div>
              <h3>2019</h3>
            </div>
            <p>
              Advanced to Senior Backend Developer at MEDICI, building financial technology systems with
              Ruby on Rails and MySQL. Architected AWS cloud solutions using S3 and CloudWatch, led technical
              discussions, and mentored developers while improving team velocity by 30%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Associate Software Architect</h4>
                <h5>Rently</h5>
              </div>
              <h3>2021</h3>
            </div>
            <p>
              Progressed from Associate Technical Lead to Associate Software Architect at Rently. Led the
              design and implementation of Kafka-based microservices architecture, improving platform reliability
              and scalability. Drove architectural decisions and established patterns for distributed systems.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Staff Engineer</h4>
                <h5>G2</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Currently serving as Staff Engineer at G2, building scalable, data-driven solutions for the world's
              largest software marketplace. Architects Ruby on Rails applications on AWS (ECS, RDS, ElastiCache)
              handling millions of user interactions monthly. Drives system architecture decisions, mentors
              engineering teams, and leads AI-driven feature adoption. Recognized as Most Valuable Professional in 2024.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
