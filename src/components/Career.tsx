import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
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
              Started my journey as a Software Developer at DXC Technology, working on
              enterprise-level applications and gaining expertise in full-stack development.
              Built strong foundations in software engineering principles and best practices.
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
              Transitioned to Ruby on Rails development at myBataz, progressing to Lead Backend Developer.
              Focused on e-commerce platform development, PostgreSQL optimization, and Redis implementation
              for enhanced performance and scalability.
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
              Advanced to Senior Backend Developer at MEDICI, specializing in Ruby on Rails,
              MySQL, and AWS services including S3 and CloudWatch. Enhanced technical discussions
              and communication skills while building robust backend systems.
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
              Progressed through multiple roles at Rently from Associate Technical Lead to
              Associate Software Architect. Led technical discussions, implemented Kafka-based
              microservices, and drove architectural decisions for scalable rental platform solutions.
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
              Currently serving as Staff Engineer at G2, responsible for building scalable,
              data-driven solutions using Ruby on Rails and AWS. Focus on technical leadership,
              system architecture decisions, and mentoring engineering teams in microservices expertise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
