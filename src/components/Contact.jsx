import { motion } from 'framer-motion';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sessionType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendClientThankYou = async (clientData) => {
    const thankYouTemplate = {
      to_email: clientData.email,
      to_name: clientData.name,
      from_name: 'Arpit Prajapati',
      session_type: clientData.sessionType,
      client_message: clientData.message,
      photographer_email: 'prajapatiarpit704@gmail.com',
      photographer_phone: '+91 6352 461286',
      instagram: '@p_arpit4423'
    };

    return emailjs.send(
      'service_19y0o5g', // Your EmailJS service ID
      'template_eanaj58', // Your client thank you template ID
      thankYouTemplate,
      'mFHCbbrLJDZPr12J2' // Your EmailJS public key
    );
  };

  const sendBookingRequest = async (clientData) => {
    const bookingTemplate = {
      to_email: 'prajapatiarpit704@gmail.com',
      to_name: 'Arpit Prajapati',
      from_name: 'Portfolio Contact Form',
      client_name: clientData.name,
      client_email: clientData.email,
      session_type: clientData.sessionType || 'Not specified',
      client_message: clientData.message,
      submission_date: new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      submission_time: new Date().toLocaleTimeString('en-IN'),
      // Additional variables that EmailJS might need
      user_name: clientData.name,
      user_email: clientData.email,
      message: clientData.message
    };

    console.log('Sending booking request with data:', bookingTemplate);
    
    return emailjs.send(
      'service_19y0o5g', // Your EmailJS service ID
      'template_v23pyom', // Your booking request template ID
      bookingTemplate,
      'mFHCbbrLJDZPr12J2' // Your EmailJS public key
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields', {
        style: {
          background: 'rgba(20, 20, 20, 0.95)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          fontFamily: 'Inter, sans-serif'
        }
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send booking request email only
      const [bookingResult] = await Promise.allSettled([
        sendBookingRequest(formData)
        // sendClientThankYou(formData) // Commented out - client thank you email disabled
      ]);

      console.log('Booking request result:', bookingResult);
      // console.log('Thank you email result:', thankYouResult); // Commented out - thank you email disabled

      // Check if at least the booking request was successful
      if (bookingResult.status === 'fulfilled') {
        toast.success('Message sent successfully! We\'ll connect with you shortly.', {
          duration: 5000,
          style: {
            background: 'rgba(20, 20, 20, 0.95)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            fontFamily: 'Inter, sans-serif'
          }
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          sessionType: '',
          message: ''
        });
      } else {
        throw new Error('Booking request failed: ' + bookingResult.reason?.text || bookingResult.reason);
      }

      // Log any thank you email errors separately
      // if (thankYouResult.status === 'rejected') {
      //   console.error('Thank you email failed:', thankYouResult.reason);
      //   // Don't show error to user if main booking email succeeded
      // }

    } catch (error) {
      console.error('Error sending emails:', error);
      console.error('Full error details:', {
        text: error.text,
        status: error.status,
        message: error.message
      });
      
      toast.error(`Failed to send message: ${error.text || error.message}. Please try again or contact directly.`, {
        duration: 6000,
        style: {
          background: 'rgba(20, 20, 20, 0.95)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          fontFamily: 'Inter, sans-serif'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <div className="contact-content">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="contact-title">Let's Create Together</h2>
            <p className="contact-description">
              Every story deserves to be told with grace. Whether it's capturing the intimacy of a portrait, 
              the magic of your special day, or the authentic moments that define your journey—I'm here to 
              craft visual poetry from your most treasured memories.
            </p>
            
            <div className="contact-details">
              <motion.a 
                href="mailto:prajapatiarpit704@gmail.com"
                className="contact-link"
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>prajapatiarpit704@gmail.com</span>
              </motion.a>
              
              <motion.a 
                href="tel:+916352461286"
                className="contact-link"
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>+91 6352 461286</span>
              </motion.a>
              
              <motion.a 
                href="https://instagram.com/p_arpit4423"
                className="contact-link"
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                <span>@arpit</span>
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="contact-form-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form className="contact-form glass" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="session-type">Session Type</label>
                <select 
                  id="session-type" 
                  name="sessionType"
                  value={formData.sessionType}
                  onChange={handleInputChange}
                >
                  <option value="">Select a session type</option>
                  <option value="portrait">Portrait Session</option>
                  <option value="wedding">Wedding Photography</option>
                  <option value="event">Event Photography</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Story</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  placeholder="Tell me about your vision, your special moment, or what story you'd like to capture..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <motion.button 
                type="submit" 
                className="submit-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                style={{
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                {isSubmitting ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                  </svg>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 4000,
        }}
      />
    </section>
  );
};

export default Contact;
