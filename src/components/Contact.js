import React from 'react';

function Contact() {
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
    <section id="contact" style ={sectionStyle}>
      <div style={overlayStyle}>
        <h1>Contact Me</h1>
      <p>Feel free to reach out for collaboration or just to say hi!</p>
      <p>Email: nirajandevhub108@gmail.com</p>
      <p>Phone: 6200164334</p>
      <p>LinkedIn: <a href="https://www.linkedin.com/in/nirajan-singh-82b851190/" target="_blank" rel="noopener noreferrer">Nirajan Singh LinkedIn</a></p>
      <p>YouTube: <a href="https://www.youtube.com/@NirajanDevHub" target="_blank" rel="noopener noreferrer">My YouTube Channel</a></p>
      <p>Salesforce Trailhead: <a href="https://trailblazer.me/id/nirajansingh" target="_blank" rel="noopener noreferrer">My Trailhead Profile</a></p>
    </div>
    </section>
  );
}

export default Contact;
