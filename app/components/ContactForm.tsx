'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import emailjs from '@emailjs/browser';

interface ContactFormData {
  name: string;
  email: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  budget?: string;
  message?: string;
  submit?: string;
}

const budgetOptions = [
  { value: '', label: 'Select budget range' },
  { value: 'under-1k', label: 'Under $1,000' },
  { value: '1k-5k', label: '$1,000 - $5,000' },
  { value: '5k-10k', label: '$5,000 - $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-plus', label: '$25,000+' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    budget: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return 'Please enter your name';
    if (name.length < 2) return 'Name must be at least 2 characters';
    if (name.length > 100) return 'Name must not exceed 100 characters';
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return 'Please enter your email';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return undefined;
  };

  const validateMessage = (message: string): string | undefined => {
    if (!message.trim()) return 'Please describe your project';
    if (message.length < 10) return 'Please provide at least 10 characters';
    if (message.length > 1000) return 'Message must not exceed 1000 characters';
    return undefined;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);

    if (nameError || emailError || messageError) {
      setErrors({ name: nameError, email: emailError, message: messageError });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing');
      }

      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          to_name: 'Masab Farooque',
          budget: formData.budget || 'Not specified',
          message: formData.message,
          reply_to: formData.email,
        },
        publicKey
      );

      if (result.status === 200) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', budget: '', message: '' });

        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setErrors({ 
        submit: 'Failed to send message. Please email me directly at masabfarooque1122@gmail.com' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (hasError: boolean) =>
    `w-full px-4 py-3.5 bg-void-black/60 border ${hasError ? 'border-red-500/60 focus:border-red-500' : 'border-white/10 focus:border-electric-cyan/60'
    } rounded-xl focus:outline-none focus:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 text-sm text-text-primary placeholder-text-muted`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-text-secondary mb-2">
          Name
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          className={inputClasses(!!errors.name)}
          disabled={isSubmitting}
        />
        {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-text-secondary mb-2">
          Email
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className={inputClasses(!!errors.email)}
          disabled={isSubmitting}
        />
        {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="contact-budget" className="block text-sm font-medium text-text-secondary mb-2">
          Budget Range
        </label>
        <select
          id="contact-budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={`${inputClasses(false)} appearance-none cursor-pointer`}
          disabled={isSubmitting}
        >
          {budgetOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-matte-charcoal text-text-primary">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-text-secondary mb-2">
          Project Details
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Tell me about your project..."
          className={`${inputClasses(!!errors.message)} resize-none`}
          disabled={isSubmitting}
        />
        {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
      </div>

      {errors.submit && (
        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
          <p className="text-sm text-red-400">{errors.submit}</p>
        </div>
      )}

      {submitSuccess && (
        <div className="p-4 bg-electric-cyan/5 border border-electric-cyan/20 rounded-xl">
          <p className="text-sm text-electric-cyan">
            Message sent successfully. I'll get back to you soon.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-4 bg-electric-cyan font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm"
        style={{ color: 'var(--color-on-accent)' }}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}