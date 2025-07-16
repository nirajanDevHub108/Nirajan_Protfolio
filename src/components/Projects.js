import React from 'react';

function Projects() {
  const sectionStyle = {
    height: '100vh',
    backgroundImage: "url('https://www.salesforce.com/content/dam/web/en_us/www/images/lets-get-digital-zoom-background-cnx21-final-zoom-background.png')", // Ensure the image is in public folder
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    color: 'white',
  };

  const overlayStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '2rem',
    borderRadius: '10px',
  };
  return (
    <section id="projects" style = {sectionStyle}>
      <div style={overlayStyle}>
        <h1>Projects</h1>
        <p>Here are some of the projects I've worked on:</p>
      <ul>
        <li>🚀 Autonomous Medical AI Agent for Salesforce Hackathon</li>
        <li>🔧 GitHub Actions Deployment Automation for Salesforce Orgs</li>
        <li>💡 Oxford university press  Devops experience</li>
      </ul>
      </div>
    </section>
  );
}

export default Projects;
