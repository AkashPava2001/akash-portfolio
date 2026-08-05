import React, { useState, useRef, useEffect } from "react";
import "./index.css";
// Import your photo - update the path and filename to match your actual photo
import profilePhoto from "./Images/IMG_20251130_134922.jpg";
import skillsImage from "./Images/Skills.jpg";
import certificationsImage from "./Images/Certifications.jpg";
import experienceImage from "./Images/Experience.jpg";
import projectsImage from "./Images/projects.jpg";
import educationImage from "./Images/education.jpg";

const CONTENT_API_URL =
  "https://script.google.com/macros/s/AKfycbzpinAZc-7fWmKaej0yBy-LcZRqN3QxBgvUKH41KWgfEzEhxwzGRgB8BfupuvqiWwCm/exec";

const getExperienceLabel = (milestoneValue, baseValue) => {
  const [year, month, day] = (milestoneValue || "").split("-").map(Number);
  const milestone = new Date(year, month - 1, day);
  const base = Number(baseValue);
  const today = new Date();
  if (Number.isNaN(milestone.getTime()) || !Number.isFinite(base)) {
    return "";
  }
  if (today < milestone) {
    return `${base}+`;
  }

  const monthsSinceMilestone = Math.max(
    0,
    (today.getFullYear() - milestone.getFullYear()) * 12 +
      today.getMonth() -
      milestone.getMonth() -
      (today.getDate() < milestone.getDate() ? 1 : 0)
  );
  const milestoneCount = base * 10 + 1 + monthsSinceMilestone;

  return `${Math.floor(milestoneCount / 10)}.${milestoneCount % 10}+`;
};

const normalizeContent = (content) => ({
  ...content.profile,
  skills: content.skills,
  certifications: content.certifications,
  experience: content.experience.map(({ detail, ...experience }) => ({
    ...experience,
    details: detail ? [detail] : []
  })),
  projects: content.projects.map(({ highlight, ...project }) => ({
    ...project,
    highlights: highlight ? [highlight] : []
  })),
  education: content.education
});

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
  const [portfolio, setPortfolio] = useState(null);
  const experienceLabel = portfolio
    ? getExperienceLabel(
        portfolio.experience_milestone,
        portfolio.experience_base
      )
    : "";
  
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
    window.open(portfolio.trailblazer, '_blank');
  };

  useEffect(() => {
    let isCurrent = true;

    if (!CONTENT_API_URL) {
      return () => {
        isCurrent = false;
      };
    }

    fetch(`${CONTENT_API_URL}?updated=${Date.now()}`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load portfolio content");
        }
        return response.json();
      })
      .then((content) => {
        if (isCurrent) {
          setPortfolio(normalizeContent(content));
        }
      })
      .catch(() => {});

    return () => {
      isCurrent = false;
    };
  }, []);

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

  if (!portfolio) {
    return null;
  }

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
                <a href={`mailto:${portfolio.email}`}>Email {portfolio.email}</a>
                <span>Phone {portfolio.phone}</span>
                <a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <p className="hero-stat-label">Experience</p>
                  <p className="hero-stat-value">{experienceLabel} yrs</p>
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
              View Full Trailblazer Profile
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
                {p.client && <p className="client">Client: {p.client}</p>}
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
