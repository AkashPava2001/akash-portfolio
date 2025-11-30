import React, { useState, useRef, useEffect } from "react";
import "./index.css";
// Import your photo - update the path and filename to match your actual photo
import profilePhoto from "./Images/IMG_20251130_134922.jpg";
import skillsImage from "./Images/Skills.jpg";
import certificationsImage from "./Images/Certifications.jpg";
import experienceImage from "./Images/Experience.jpg";
import projectsImage from "./Images/projects.jpg";
import educationImage from "./Images/education.jpg";

const portfolio = {
  name: "Akash Sivakumar",
  role: "Salesforce Developer",
  location: "Chennai, India",
  phone: "+91 9790478504",
  email: "akash21feb2001@gmail.com",
  linkedin: "https://www.linkedin.com/in/akash-s-00a980166",
  summary:
    "Salesforce Developer with 3+ years of experience building scalable enterprise applications. Proficient in LWC, Apex, Integrations, CI/CD, and automation. Strong track record of delivering optimized solutions for global clients and collaborating with cross-functional teams for high-quality implementations.",

  skills: {
    development: [
      "Apex",
      "Lightning Web Components (LWC)",
      "Visualforce",
      "Triggers",
      "JavaScript"
    ],
    integrations: ["REST API", "External Integrations"],
    configuration: ["Flows", "Validation Rules", "Approval Processes"],
    devops: ["Bitbucket", "Jenkins CI/CD", "Version Control"],
    testing: ["Unit Test Classes", "Release Management"]
  },

  certifications: [
    "Salesforce Certified Administrator",
    "Salesforce Certified App Builder",
    "Salesforce Certified Platform Developer I",
    "Salesforce Certified JavaScript Developer I",
    "Salesforce Certified AI Associate",
    "Salesforce Certified Agentforce Specialist"
  ],

  experience: [
    {
      role: "Associate",
      company: "Cognizant Technology Solutions",
      period: "Apr 2025 – Current",
      details: [
        "Designed & optimized Salesforce components using LWC, Visualforce, Apex & Triggers.",
        "Implemented Batch Apex & complex automation flows.",
        "Managed ALM, DevOps & CI/CD deployments with Bitbucket & Jenkins.",
        "Created SDD, ADD, Unit Testing documents for delivery quality."
      ]
    },
    {
      role: "Programmer Analyst",
      company: "Cognizant Technology Solutions",
      period: "Sep 2023 – Mar 2025",
      details: [
        "Built custom Salesforce solutions using Apex Classes, Triggers, LWC & Batch Apex.",
        "Authored test documentation and delivered scalable business solutions."
      ]
    },
    {
      role: "Programmer Analyst Trainee",
      company: "Cognizant Technology Solutions",
      period: "Aug 2022 – Aug 2023",
      details: [
        "Wrote unit test classes, executed configuration updates.",
        "Gained real-time experience in Salesforce development & troubleshooting."
      ]
    }
  ],

  projects: [
    {
      name: "Case Research Request Enhancement",
      tech: "LWC, Apex",
      highlights: [
        "Enhanced dropdown UI for detailed Sales Rep selection.",
        "Added Approval Process, Email notifications & dashboard enhancements.",
        "Designed LWC components & approval workflows."
      ]
    },
    {
      name: "Custom PDF Generation – Conga Replacement",
      tech: "Apex, LWC, Visualforce",
      highlights: [
        "Replaced Conga with fully custom VF + Apex PDF generator.",
        "Implemented grouped tables, pagination & field-set-based configuration.",
        "Reduced dependency & improved performance by 35%."
      ]
    },
    {
      name: "Account Alignment Enhancement",
      tech: "Apex, LWC",
      highlights: [
        "Developed LWC Quick Action buttons for alignment workflow.",
        "Built Apex controller with status updates & Batch Apex processes.",
        "Led CI/CD deployment and release management."
      ]
    },
    {
      name: "AN Inventory Management",
      tech: "Apex, LWC",
      highlights: [
        "Built LWC UI for inventory batch processing.",
        "Improved data accuracy by 30% & barcode scanning by 25%.",
        "Achieved 95% test coverage across scenarios."
      ]
    }
  ],

  education: {
    degree: "B.Tech – Information Technology",
    college: "Karpagam College of Engineering, Coimbatore",
    year: "2018 – 2022",
    cgpa: "8.3"
  }
};

const Section = React.forwardRef(({ title, children, id, isActive }, ref) => (
  <section id={id} ref={ref} className={`full-section ${isActive ? 'active' : ''}`}>
    <div className="section-content">
      <div className="text-content">
        <h2 className="section-title">{title}</h2>
        <div>{children}</div>
      </div>
      <div className="image-content">
        <div className="section-image">
          {title === "About" && (
            <img 
              src={profilePhoto} 
              alt="Akash Sivakumar - Salesforce Developer" 
              className="section-photo"
            />
          )}
          {title === "Skills" && (
            <img 
              src={skillsImage} 
              alt="Salesforce Development Skills" 
              className="section-photo"
            />
          )}
          {title === "Certifications" && (
            <img 
              src={certificationsImage} 
              alt="Salesforce Certifications" 
              className="section-photo"
            />
          )}
          {title === "Experience" && (
            <img 
              src={experienceImage} 
              alt="Professional Experience" 
              className="section-photo"
            />
          )}
          {title === "Projects" && (
            <img 
              src={projectsImage} 
              alt="Salesforce Projects" 
              className="section-photo"
            />
          )}
          {title === "Education" && (
            <img 
              src={educationImage} 
              alt="Education Background" 
              className="section-photo"
            />
          )}
        </div>
      </div>
    </div>
  </section>
));
export default function App() {
  const [activeSection, setActiveSection] = useState("about");
  
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const certificationsRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const educationRef = useRef(null);

  const sectionRefs = {
    about: aboutRef,
    skills: skillsRef,
    certifications: certificationsRef,
    experience: experienceRef,
    projects: projectsRef,
    education: educationRef
  };

  const scrollToSection = (sectionId) => {
    const section = sectionRefs[sectionId].current;
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  const handleCertificationClick = () => {
    window.open('https://www.salesforce.com/trailblazer/akass54', '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      const sections = Object.entries(sectionRefs);
      for (const [sectionId, ref] of sections) {
        if (ref.current) {
          const section = ref.current;
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="portfolio-app">
      {/* Navigation Tabs */}
      <nav className="navigation-tabs">
        <div className="nav-container">
          <div className="logo">Portfolio</div>
          <div className="nav-links">
            <button 
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => scrollToSection('about')}
            >
              About
            </button>
            <button 
              className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
              onClick={() => scrollToSection('skills')}
            >
              Skills
            </button>
            <button 
              className={`nav-link ${activeSection === 'certifications' ? 'active' : ''}`}
              onClick={() => scrollToSection('certifications')}
            >
              Certifications
            </button>
            <button 
              className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
              onClick={() => scrollToSection('experience')}
            >
              Experience
            </button>
            <button 
              className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => scrollToSection('projects')}
            >
              Projects
            </button>
            <button 
              className={`nav-link ${activeSection === 'education' ? 'active' : ''}`}
              onClick={() => scrollToSection('education')}
            >
              Education
            </button>
          </div>
        </div>
      </nav>

      {/* Full Page Sections */}
      <div className="sections-container">
        <Section 
          title="About" 
          id="about" 
          ref={aboutRef}
          isActive={activeSection === 'about'}
        >
          <div className="hero">
            <div className="hero-content">
              <h1>{portfolio.name}</h1>
              <p className="role">{portfolio.role}</p>
              <p className="location">{portfolio.location}</p>
              <p className="summary">{portfolio.summary}</p>

              <div className="contact-row">
                <a href={`mailto:${portfolio.email}`}>📧 {portfolio.email}</a>
                <span>📱 {portfolio.phone}</span>
                <a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a>
              </div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <p className="hero-stat-label">Experience</p>
                  <p className="hero-stat-value">3+ yrs</p>
                </div>
                <div className="hero-stat">
                  <p className="hero-stat-label">Certifications</p>
                  <p className="hero-stat-value">6</p>
                </div>
                <div className="hero-stat">
                  <p className="hero-stat-label">Current Role</p>
                  <p className="hero-stat-value">Associate</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section 
          title="Skills" 
          id="skills" 
          ref={skillsRef}
          isActive={activeSection === 'skills'}
        >
          <div className="skills-container">
            {Object.entries(portfolio.skills).map(([group, list]) => (
              <div key={group} className="skill-block">
                <h3>{group.toUpperCase()}</h3>
                <div className="skill-items">
                  {list.map((item, i) => (
                    <span key={i} className="pill">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section 
          title="Certifications" 
          id="certifications" 
          ref={certificationsRef}
          isActive={activeSection === 'certifications'}
        >
          <ul className="cert-list">
            {portfolio.certifications.map((cert, i) => (
              <li 
                key={i} 
                className="cert-item"
                onClick={handleCertificationClick}
              >
                <span className="cert-badge">✓</span>
                <span className="cert-name">{cert}</span>
                <span className="cert-arrow">↗</span>
              </li>
            ))}
          </ul>
          
          <div className="trailblazer-note">
            <p>Click on any certification to view my Trailblazer profile</p>
            <button 
              onClick={handleCertificationClick}
              className="trailblazer-link"
            >
              🌟 View Full Trailblazer Profile
            </button>
          </div>
        </Section>

        <Section 
          title="Experience" 
          id="experience" 
          ref={experienceRef}
          isActive={activeSection === 'experience'}
        >
          <div className="experience-container">
            {portfolio.experience.map((exp, i) => (
              <div key={i} className="exp-card">
                <h3>{exp.role} — {exp.company}</h3>
                <p className="period">{exp.period}</p>
                <ul>
                  {exp.details.map((d, j) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section 
          title="Projects" 
          id="projects" 
          ref={projectsRef}
          isActive={activeSection === 'projects'}
        >
          <div className="projects-grid">
            {portfolio.projects.map((p, i) => (
              <div key={i} className="project-card">
                <h3>{p.name}</h3>
                <p className="tech">{p.tech}</p>
                <ul>
                  {p.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section 
          title="Education" 
          id="education" 
          ref={educationRef}
          isActive={activeSection === 'education'}
        >
          <div className="education-card">
            <h3>{portfolio.education.degree}</h3>
            <p className="college">{portfolio.education.college}</p>
            <p className="year">{portfolio.education.year}</p>
            <p className="cgpa">CGPA: {portfolio.education.cgpa}</p>
          </div>
        </Section>
      </div>
    </div>
  );
}