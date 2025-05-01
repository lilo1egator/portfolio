import './ContactForm.scss';
import { useState } from 'react';
import { FaUser, FaEnvelope, FaRegCommentDots, FaPaperPlane } from 'react-icons/fa';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Enter your name';
    if (!form.email.trim()) newErrors.email = 'Enter your email';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.message.trim()) newErrors.message = 'Enter your message';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
    
  };

  return (
    <section className="contact-form" id="contact">
      <div className="contact-form__container">
        <h2 className="contact-form__title">Contact me</h2>
        <p className="contact-form__desc">I will get back to you soon.</p>
        {submitted ? (
          <div className="contact-form__success">Thank you for your message!</div>
        ) : (
          <form className="contact-form__form" onSubmit={handleSubmit} autoComplete="off" noValidate>
            <label className="contact-form__label sr-only" htmlFor="name">Name</label>
            <div className={`contact-form__input-wrap${errors.name ? ' contact-form__input-wrap--error' : ''}`}>
              <FaUser className="contact-form__icon" />
              <input
                type="text"
                name="name"
                id="name"
                className="contact-form__input"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                aria-label="Your name"
                autoComplete="off"
                required
              />
            </div>

            <label className="contact-form__label sr-only" htmlFor="email">Email</label>
            <div className={`contact-form__input-wrap${errors.email ? ' contact-form__input-wrap--error' : ''}`}>
              <FaEnvelope className="contact-form__icon" />
              <input
                type="email"
                name="email"
                id="email"
                className="contact-form__input"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                aria-label="Your email"
                autoComplete="off"
                required
              />
            </div>

            <label className="contact-form__label sr-only" htmlFor="message">Message</label>
            <div className={`contact-form__input-wrap contact-form__input-wrap--textarea${errors.message ? ' contact-form__input-wrap--error' : ''}`}>
              <FaRegCommentDots className="contact-form__icon" />
              <textarea
                name="message"
                id="message"
                className="contact-form__textarea"
                placeholder="Your message"
                value={form.message}
                onChange={handleChange}
                aria-label="Your message"
                required
              />
            </div>

            <button type="submit" className="contact-form__button">
              <FaPaperPlane style={{marginRight: 8, marginBottom: -2}} /> Send
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactForm; 