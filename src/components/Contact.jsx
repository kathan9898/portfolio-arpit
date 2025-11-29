import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Wedding Culling & Color Grading',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    // Constructing the casual, detailed message for the editor
    const fullMessage = `
Hey Arpit,

You've got a new inquiry from ${formData.name}!

Here are the details:
------------------------------------------
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Service: ${formData.service}
------------------------------------------

Message:
"${formData.message}"

Cheers,
Your Portfolio Site
    `;

    // Replace these with your actual EmailJS credentials
    // Service ID: service_xxxxxxx
    // Template ID: template_xxxxxxx
    // Public Key: your_public_key_here

    // Using placeholders as requested to restore structure. 
    // Please fill in your actual keys from the EmailJS dashboard.
    emailjs.send(
      'service_19y0o5g',
      'template_v23pyom',
      {
        from_name: formData.name,
        from_email: formData.email,
        message: fullMessage,
        // We also send individual fields in case your template uses them directly
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone,
        service_type: formData.service,
        original_message: formData.message
      },
      'mFHCbbrLJDZPr12J2'
    )
      .then((result) => {
        setLoading(false);
        toast.success("Thank you! I'll be in touch shortly.", {
          style: {
            background: '#F5F5DC',
            color: '#4169E1',
            fontFamily: 'Lato, sans-serif',
          },
          iconTheme: {
            primary: '#4169E1',
            secondary: '#F5F5DC',
          },
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Wedding Culling & Color Grading',
          message: ''
        });
      }, (error) => {
        setLoading(false);
        toast.error("Something went wrong. Please try again.", {
          style: {
            background: '#F5F5DC',
            color: '#800000',
            fontFamily: 'Lato, sans-serif',
          }
        });
        console.error(error.text);
      });
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <Toaster position="bottom-center" />
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-accent font-sans text-sm uppercase tracking-[0.2em] mb-4">
            Inquiries
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Elevate Your Imagery
          </h3>
          <p className="text-text-light text-lg font-light max-w-2xl mx-auto">
            Ready to transform your raw captures into editorial masterpieces?
            Let's discuss your vision and how my high-end retouching services can refine your portfolio.
          </p>
        </div>

        <motion.form
          onSubmit={sendEmail}
          className="space-y-6 bg-white/40 backdrop-blur-sm p-8 md:p-12 border border-primary/10 shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-text-dark font-sans text-xs uppercase tracking-widest mb-2 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white border border-primary/20 p-4 focus:outline-none focus:border-primary transition-colors font-serif text-primary placeholder:text-primary/30"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-text-dark font-sans text-xs uppercase tracking-widest mb-2 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white border border-primary/20 p-4 focus:outline-none focus:border-primary transition-colors font-serif text-primary placeholder:text-primary/30"
                placeholder="example@gmail.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-text-dark font-sans text-xs uppercase tracking-widest mb-2 font-semibold">Phone (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white border border-primary/20 p-4 focus:outline-none focus:border-primary transition-colors font-serif text-primary placeholder:text-primary/30"
                placeholder="+91 1234 567890"
              />
            </div>
            <div>
              <label htmlFor="service" className="block text-text-dark font-sans text-xs uppercase tracking-widest mb-2 font-semibold">Service Required</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-white border border-primary/20 p-4 focus:outline-none focus:border-primary transition-colors font-serif text-primary cursor-pointer"
              >
                <option>Wedding Culling & Color Grading</option>
                <option>High-End Beauty Retouching</option>
                <option>Editorial & Fashion</option>
                <option>Commercial Product Retouching</option>
                <option>Bulk Event Processing</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-text-dark font-sans text-xs uppercase tracking-widest mb-2 font-semibold">Project Details</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
              className="w-full bg-white border border-primary/20 p-4 focus:outline-none focus:border-primary transition-colors font-serif text-primary placeholder:text-primary/30"
              placeholder="Tell me about your project volume, style preferences, and turnaround requirements..."
            ></textarea>
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full md:w-auto min-w-[200px] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Request Consultation'}
            </button>
          </div>
        </motion.form>

        <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-8 text-text-light font-light text-sm">
          <a href="mailto:prajapatiarpit704@gmail.com" className="hover:text-primary transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            prajapatiarpit704@gmail.com
          </a>
          <a href="tel:+916352461286" className="hover:text-primary transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            +91 6352 461286
          </a>
          <a href="https://instagram.com/p_arpit4423" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.8 21h8.4a5.5 5.5 0 005.5-5.5v-5.5a5.5 5.5 0 00-5.5-5.5H7.8a5.5 5.5 0 00-5.5 5.5v5.5a5.5 5.5 0 005.5 5.5z" /></svg>
            @p_arpit4423
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
