import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Heart
} from 'lucide-react';
import './Footer.scss';

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'How it Works', path: '/how-it-works' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Safety', path: '/safety' },
      { name: 'Community Guidelines', path: '/guidelines' },
    ],
    tutors: [
      { name: 'Become a Tutor', path: '/become-tutor' },
      { name: 'Tutor Resources', path: '/tutor-resources' },
      { name: 'Success Stories', path: '/success-stories' },
      { name: 'Tutor Support', path: '/tutor-support' },
    ],
    students: [
      { name: 'Find Tutors', path: '/tutors' },
      { name: 'Book Session', path: '/booking' },
      { name: 'Student Resources', path: '/student-resources' },
      { name: 'Study Tips', path: '/study-tips' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Refund Policy', path: '/refund' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/tutorinminutes', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/tutorinminutes', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/tutorinminutes', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/tutorinminutes', label: 'LinkedIn' },
  ];

  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="container">
          <div className="footer__content">
            {/* Brand Section */}
            <div className="footer__brand">
              <Link to="/" className="footer__logo">
                <div className="footer__logo-icon">
                  <BookOpen size={28} />
                </div>
                <span className="footer__logo-text">
                  <span className="text-gradient">Tutor</span>InMinutes
                </span>
              </Link>
              
              <p className="footer__description">
                Connecting students with expert tutors for personalized learning experiences. 
                Master any subject with 1:1 guidance from verified professionals.
              </p>

              <div className="footer__contact">
                <div className="footer__contact-item">
                  <Mail size={16} />
                  <span>support@tutorinminutes.com</span>
                </div>
                <div className="footer__contact-item">
                  <Phone size={16} />
                  <span>+91 98765 43210</span>
                </div>
                <div className="footer__contact-item">
                  <MapPin size={16} />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </div>

              <div className="footer__social">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="footer__links">
              <div className="footer__links-section">
                <h3 className="footer__links-title">Company</h3>
                <ul className="footer__links-list">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link to={link.path} className="footer__link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer__links-section">
                <h3 className="footer__links-title">Students</h3>
                <ul className="footer__links-list">
                  {footerLinks.students.map((link) => (
                    <li key={link.name}>
                      <Link to={link.path} className="footer__link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer__links-section">
                <h3 className="footer__links-title">Tutors</h3>
                <ul className="footer__links-list">
                  {footerLinks.tutors.map((link) => (
                    <li key={link.name}>
                      <Link to={link.path} className="footer__link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer__links-section">
                <h3 className="footer__links-title">Support</h3>
                <ul className="footer__links-list">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <Link to={link.path} className="footer__link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-content">
            <div className="footer__legal-links">
              {footerLinks.legal.map((link, index) => (
                <React.Fragment key={link.name}>
                  <Link to={link.path} className="footer__legal-link">
                    {link.name}
                  </Link>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="footer__separator">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="footer__copyright">
              <p>
                © {new Date().getFullYear()} TutorInMinutes. Made with{' '}
                <Heart size={14} className="footer__heart" /> in India.
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;