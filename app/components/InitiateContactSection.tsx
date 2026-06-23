'use client';

import { motion } from 'framer-motion';
import ContactForm from './ContactForm';
import { SiGithub, SiInstagram } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import FiverrIcon from './icons/FiverrIcon';

export default function InitiateContactSection() {
  const socialLinks = [
    {
      name: 'Fiverr',
      url: 'https://www.fiverr.com/p_scribbles/portfolio/',
      icon: <FiverrIcon className="w-5 h-5" />
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Masab12',
      icon: <SiGithub className="w-5 h-5" />
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/masabfarooque',
      icon: <FaLinkedin className="w-5 h-5" />
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/masabfarooque',
      icon: <SiInstagram className="w-5 h-5" />
    },
  ];

  return (
    <section id="contact" className="relative bg-transparent py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-t from-void-black via-matte-charcoal/10 to-void-black pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-text-primary mb-4">
            Get in Touch
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-electric-cyan to-deep-violet rounded-full mb-6" />
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl">
            Ready to build something? Let's talk about your project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 items-start">
          <motion.div
            className="lg:col-span-3 glass-card rounded-lg p-6 md:p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>

          <div className="lg:col-span-2 space-y-6">
            <motion.div
              className="glass-card rounded-lg p-6 md:p-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl md:text-2xl font-heading font-bold text-text-primary mb-5">
                Direct Contact
              </h3>
              <div className="space-y-5">
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Email</p>
                  <motion.a
                    href="mailto:masabfarooque1122@gmail.com"
                    className="text-electric-cyan text-sm break-all inline-block hover:underline"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    masabfarooque1122@gmail.com
                  </motion.a>
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Phone</p>
                  <motion.a
                    href="tel:+923045624189"
                    className="text-electric-cyan text-sm inline-block hover:underline"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    +92 304 5624189
                  </motion.a>
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Location</p>
                  <p className="text-text-primary text-sm">Islamabad, Pakistan</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass-card rounded-lg p-6 md:p-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl md:text-2xl font-heading font-bold text-text-primary mb-5">
                Connect
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-transparent/50 border border-white/5 hover:border-electric-cyan/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -4, backgroundColor: 'rgba(191,84,44,0.05)' }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-electric-cyan/5 flex items-center justify-center text-text-secondary group-hover:text-electric-cyan group-hover:bg-electric-cyan/10 transition-all duration-300">
                      {link.name === 'Fiverr' && (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M13.74 4.5c-.56 0-1.06.12-1.49.35a2.67 2.67 0 0 0-1.05.97A4.3 4.3 0 0 0 10.62 4.5c-1.62 0-2.73.95-2.73 2.76v.67H6.5v2.14h1.4v6.43h2.62V10.07h1.9V7.93h-1.9v-.52c0-.57.24-.85.75-.85h1.15V4.5h-.68Zm4.5 3.23c-2.12 0-3.4 1.52-3.4 3.64 0 2.2 1.36 3.63 3.5 3.63 1.26 0 2.24-.5 2.86-1.38l-1.58-1.12a1.5 1.5 0 0 1-1.2.6c-.77 0-1.3-.45-1.42-1.2h4.38v-.63c0-2.22-1.18-3.54-3.14-3.54Zm-.06 1.83c.66 0 1.08.42 1.15 1.13h-2.36c.1-.7.53-1.13 1.21-1.13Z" />
                        </svg>
                      )}
                      {link.name === 'GitHub' && (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                        </svg>
                      )}
                      {link.name === 'LinkedIn' && (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                        </svg>
                      )}
                      {link.name === 'Instagram' && (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors text-center">
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}