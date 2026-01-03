import React from 'react';

function About() {
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
    <section id="about" style={sectionStyle}>
      <div style={overlayStyle}>
      <h2>About Me</h2>
      <p>
      I am a seasoned Salesforce DevOps Engineer with 2.5 years expertise in release management, release engineering, and extensive knowledge of the Salesforce platform.
      I hold certifications as a Salesforce Platform Developer I, Administrator, AI Associate, and 1x SFDC DevOps. 
      With a proven track record of implementing robust DevOps practices, designing and executing CI/CD pipelines, and managing metadata migrations and version control, 
      I am skilled in driving efficiency within Agile environments. Proficient in tools such as Jenkins, Copado, Gearset, and Azure DevOps, 
      I focus on delivering high-quality solutions and automation in Salesforce DevOps.
      </p>
      </div>
    </section>
  );
}

export default About;
