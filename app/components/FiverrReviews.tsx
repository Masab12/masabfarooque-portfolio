'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

interface Review {
  name: string;
  country: string;
  isRepeat: boolean;
  timeAgo: string;
  review: string;
  service: string;
}

const reviews: Review[] = [
  {
    name: 'fibads',
    country: 'Netherlands',
    isRepeat: true,
    timeAgo: '6 days ago',
    review: "Absolutely amazing work. I've never had this experience with anyone before. Masab truly went above and beyond, unbelievable dedication and effort. He has a very strong understanding of complex scraping and everything that comes with it. The end product is amazing: a fully working SaaS platform that exceeded my expectations.",
    service: 'Full Stack Web Applications'
  },
  {
    name: 'fibads',
    country: 'Netherlands',
    isRepeat: true,
    timeAgo: '1 month ago',
    review: "Working with Masab was an absolute pleasure on our Autonomous Outreach Engine project. The result is completely bug-free, runs beautifully, and the dashboard is clean, intuitive, and perfectly executed! Masab shows outstanding code expertise and a deep understanding of complex concepts.",
    service: 'Full Stack Web Applications'
  },
  {
    name: 'ksharma222',
    country: 'United States',
    isRepeat: true,
    timeAgo: '2 months ago',
    review: "Thank you for your hard work on this project, your attention to detail, and your willingness to refine the work. I look forward to working with you on future projects.",
    service: 'Data Scraping'
  },
  {
    name: 'manelpassos',
    country: 'Portugal',
    isRepeat: true,
    timeAgo: '1 month ago',
    review: "Masab was very professional in everything we worked.",
    service: 'Full Stack Web Applications'
  },
  {
    name: 'ksharma222',
    country: 'United States',
    isRepeat: true,
    timeAgo: '1 month ago',
    review: "He is simply the best of the best",
    service: 'Full Stack Web Applications'
  },
  {
    name: 'rogerlic',
    country: 'Italy',
    isRepeat: false,
    timeAgo: '3 months ago',
    review: "I highly recommend Masab to anyone looking for advanced AI systems, business automation, conversational interfaces or full-stack development. I approached him with the idea of building a complete business management system powered by multilingual AI.",
    service: 'Full Stack Web Applications'
  },
  {
    name: 'riansh_kamra',
    country: 'Canada',
    isRepeat: false,
    timeAgo: '5 months ago',
    review: "He is very hardworking, polite, and professional. He consistently shows dedication to his work and maintains a positive and respectful attitude.",
    service: 'Full Stack Web Applications'
  },
  {
    name: 'alessandroirace',
    country: 'Italy',
    isRepeat: false,
    timeAgo: '5 months ago',
    review: "He responds fast, communicates a lot, and works very hard.",
    service: 'Full Stack Web Applications'
  },
  {
    name: 'amanjoshi752004',
    country: 'India',
    isRepeat: true,
    timeAgo: '5 months ago',
    review: "Always a pleasure working with Masab Farooque! This is my 5th time hiring him, and as always, he delivers excellent work with professionalism and consistency. Highly reliable and skilled.",
    service: 'Data Scraping'
  },
  {
    name: 'rjr_factive',
    country: 'United States',
    isRepeat: false,
    timeAgo: '6 months ago',
    review: "Very great working with Masab! Will definitely work with him again",
    service: 'Full Stack Web Applications'
  },
  {
    name: 'amanjoshi752004',
    country: 'India',
    isRepeat: true,
    timeAgo: '6 months ago',
    review: "Great work master in his field great communication this was my 4th project with him from python automation to website debugging or shopify development he excels in all. Great person and goes above and beyond the scope to complete clients project.",
    service: 'Data Scraping'
  },
  {
    name: 'amanjoshi752004',
    country: 'India',
    isRepeat: true,
    timeAgo: '7 months ago',
    review: "Outstanding Work! I had the pleasure of working with Masab on a project that involved both website optimization and Python automation, and I couldn't be happier with the results. They quickly understood my requirements, identified areas to improve performance.",
    service: 'Full Stack Web Applications'
  },
  {
    name: 'amanjoshi752004',
    country: 'India',
    isRepeat: true,
    timeAgo: '8 months ago',
    review: "Working with Masab Farooque was an absolute pleasure. He delivered outstanding results on a complex Python automation project, exceeding all expectations in both speed and quality. His code was clean, efficient, and exceptionally well-documented.",
    service: 'Python Automation'
  },
];

function ReviewCard({ review }: { review: Review }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = review.review.length > 180;
  const displayText = isExpanded || !shouldTruncate
    ? review.review
    : review.review.slice(0, 180) + '...';

  return (
    <motion.div
      className="flex-shrink-0 w-[340px] md:w-[400px] h-full"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="h-full glass-card rounded-2xl p-6 border border-white/5 hover:border-electric-cyan/30 transition-all duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-lg font-semibold text-text-primary">
                {review.name}
              </h4>
              {review.isRepeat && (
                <motion.span
                  className="px-2 py-0.5 text-xs font-semibold rounded-full bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                >
                  Repeat Client
                </motion.span>
              )}
            </div>
            <p className="text-sm text-text-muted">{review.country} • {review.timeAgo}</p>
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="w-4 h-4 text-yellow-400" />
            ))}
          </div>
        </div>

        {/* Review Text */}
        <div className="flex-1 mb-4">
          <p className="text-text-secondary text-sm leading-relaxed">
            "{displayText}"
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-electric-cyan text-xs mt-2 hover:underline"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Service Tag */}
        <div className="pt-3 border-t border-white/5">
          <span className="text-xs text-text-muted">{review.service}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function FiverrReviews() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="relative w-full bg-void-black py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-matte-charcoal/5 to-void-black pointer-events-none" />

      <div className="relative max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-text-primary mb-4">
            Client Reviews
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-electric-cyan to-deep-violet rounded-full mb-4" />
          <p className="text-text-secondary text-lg mb-6">
            Real feedback from clients on Fiverr
          </p>
          <motion.a
            href="https://www.fiverr.com/p_scribbles"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-electric-cyan/10 border border-electric-cyan/30 rounded-xl text-electric-cyan hover:bg-electric-cyan/20 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-semibold">View All 134 Reviews on Fiverr</span>
            <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>

      {/* Scrolling Reviews */}
      <div 
        className="relative overflow-hidden w-full group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-6 pb-8 min-w-max"
          animate={isPaused ? {} : {
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 80,
              ease: 'linear',
            },
          }}
        >
          {/* Double the array for seamless infinite scrolling */}
          {[...reviews, ...reviews, ...reviews, ...reviews].map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-void-black to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-void-black to-transparent pointer-events-none z-10" />
      </div>

      {/* Stats Bar */}
      <motion.div
        className="relative max-w-7xl mx-auto mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="glass-card rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-electric-cyan mb-1">134</div>
              <div className="text-sm text-text-muted">Total Reviews</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-electric-cyan mb-1">5.0</div>
              <div className="text-sm text-text-muted">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-deep-violet mb-1">40+</div>
              <div className="text-sm text-text-muted">Repeat Clients</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-deep-violet mb-1">100%</div>
              <div className="text-sm text-text-muted">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
