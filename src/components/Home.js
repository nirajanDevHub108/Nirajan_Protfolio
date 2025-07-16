import React from 'react';

function Home() {
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
    <section id="home" style={sectionStyle}>
      <div style={overlayStyle}>
        <h1>Hello, I'm Nirajan 👋</h1>
        <p>A passionate Salesforce & DevOps engineer exploring the cloud & AI space.</p>
      </div>
    </section>
  );
}

export default Home;

