import React, { useState } from 'react';
import './Style.css';

const ContactUsComp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", contact: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]{3,}$/; // Only letters and spaces
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
    const contactRegex = /^\d{10}$/; // Exactly 10 digits

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = "Name can only contain letters and spaces and minimum 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Contact No is required";
    } else if (!contactRegex.test(formData.contact)) {
      newErrors.contact = "Contact No must be exactly 10 digits";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 4 || formData.message.length > 200) {
      newErrors.message = "Message must be between 4 and 200 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const { name, email, contact, message } = formData;
      
      // Display form data in the alert
      alert(
        `Form Submitted Successfully!\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Contact: ${contact}\n` +
        `Message: ${message}`
      );
  
      console.log("Form Submitted:", formData);
  
      // Reset form
      setFormData({ name: "", email: "", contact: "", message: "" });
      setErrors({});
    }
  };
  

  return (
    <div style={{background:"#FFF8E1"}} className='contactSection'>
      <div className="contact-container">
        <h2 className="contact-title">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "input-error" : "input-field"}
            />
            {errors.name && <div className="error-text">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : "input-field"}
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label>Contact No</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className={errors.contact ? "input-error" : "input-field"}
            />
            {errors.contact && <div className="error-text">{errors.contact}</div>}
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className={errors.message ? "input-error" : "input-field"}
            ></textarea>
            {errors.message && <div className="error-text">{errors.message}</div>}
          </div>

          <button type="submit" className="submit-button btn btn-warning">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsComp;