import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, MouseEvent, useRef } from 'react'

interface LandingPageProps {
  onGetStarted: () => void
}

interface FeatureCardProps {
  feature: {
    icon: string
    title: string
    description: string
  }
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

function FeatureCard3D({ feature, index, isHovered, onHover, onLeave }: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg'])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5
    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    onLeave()
  }

  return (
    <motion.div
      ref={ref}
      className={`feature-card ${isHovered ? 'hovered' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="feature-content"
        style={{
          transform: 'translateZ(50px)',
        }}
      >
        <motion.div
          className="feature-icon"
          animate={isHovered ? { scale: 1.2, rotate: 360 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          {feature.icon}
        </motion.div>
        <h3 className="feature-title">{feature.title}</h3>
        <p className="feature-description">{feature.description}</p>
      </motion.div>

      {/* Shine effect */}
      <motion.div
        className="feature-shine"
        style={{
          background: `radial-gradient(circle at ${(x.get() + 0.5) * 100}% ${
            (y.get() + 0.5) * 100
          }%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Glow */}
      <motion.div
        className="feature-glow"
        animate={{ opacity: isHovered ? 0.6 : 0 }}
      />
    </motion.div>
  )
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      icon: '🎨',
      title: 'Beautiful 3D Graphics',
      description: 'Stunning animated spheres and particle effects powered by Three.js',
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Built on Solana for instant transactions and low fees',
    },
    {
      icon: '🔒',
      title: 'Secure & Reliable',
      description: 'Powered by Anchor framework with battle-tested security',
    },
    {
      icon: '💎',
      title: 'Metaplex Standard',
      description: 'Full NFT standard compliance with metadata and royalties',
    },
    {
      icon: '🌈',
      title: 'Smooth Animations',
      description: 'Buttery smooth interactions with Framer Motion',
    },
    {
      icon: '📱',
      title: 'Fully Responsive',
      description: 'Perfect experience on desktop, tablet, and mobile',
    },
  ]

  const stats = [
    { value: '< 1s', label: 'Transaction Time' },
    { value: '$0.00025', label: 'Average Fee' },
    { value: '100%', label: 'Uptime' },
    { value: '∞', label: 'Possibilities' },
  ]

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <motion.section 
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="hero-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div
            className="hero-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          >
            ✨ Powered by Solana
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Mint NFTs with
            <br />
            <span className="gradient-text">Stunning 3D Graphics</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Create, mint, and manage your NFT collection with the most beautiful
            <br />
            minting experience on Solana. No coding required.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.button
              className="btn-primary"
              onClick={onGetStarted}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Minting
              <span className="btn-arrow">→</span>
            </motion.button>

            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://docs.solana.com/', '_blank')}
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="hero-stats"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.3 + index * 0.1, type: 'spring' }}
              >
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Animated Background Elements */}
        <div className="hero-bg">
          <motion.div
            className="hero-circle hero-circle-1"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="hero-circle hero-circle-2"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="hero-circle hero-circle-3"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="features">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Why Choose Us?</h2>
          <p className="section-subtitle">
            Everything you need to create amazing NFTs
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard3D
              key={index}
              feature={feature}
              index={index}
              isHovered={hoveredFeature === index}
              onHover={() => setHoveredFeature(index)}
              onLeave={() => setHoveredFeature(null)}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="cta"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="cta-content">
          <motion.h2
            className="cta-title"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Ready to Create Your NFT?
          </motion.h2>
          <motion.p
            className="cta-subtitle"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Join thousands of creators minting on Solana
          </motion.p>
          <motion.button
            className="btn-cta"
            onClick={onGetStarted}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(102, 126, 234, 0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
            <span className="btn-sparkle">✨</span>
          </motion.button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="landing-footer">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p>Built with ❤️ on Solana</p>
          <div className="footer-links">
            <a href="https://solana.com" target="_blank" rel="noopener noreferrer">Solana</a>
            <span>•</span>
            <a href="https://www.anchor-lang.com" target="_blank" rel="noopener noreferrer">Anchor</a>
            <span>•</span>
            <a href="https://docs.metaplex.com" target="_blank" rel="noopener noreferrer">Metaplex</a>
          </div>
        </motion.div>
      </footer>
    </div>
  )
}
