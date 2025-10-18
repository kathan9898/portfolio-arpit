import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Collections from './components/Collections'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import './App.css'

function App() {
  const [currentTheme, setCurrentTheme] = useState('default')
  const [isScrolledToHero, setIsScrolledToHero] = useState(true)

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement
    if (currentTheme === 'default') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', currentTheme)
    }
  }, [currentTheme])

  // Scroll-based theme reset
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home')
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        const scrollPosition = window.scrollY + window.innerHeight / 2
        
        if (scrollPosition <= heroBottom) {
          if (!isScrolledToHero) {
            setCurrentTheme('default')
            setIsScrolledToHero(true)
          }
        } else {
          setIsScrolledToHero(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolledToHero])

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme)
    setIsScrolledToHero(false)
  }

  return (
    <motion.div 
      className="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Collections 
          currentTheme={currentTheme} 
          onThemeChange={handleThemeChange} 
        />
        <Contact />
      </main>
      
      {/* Simple Footer */}
      <motion.footer 
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="footer-content">
            <p className="footer-text">
              © 2025 Arpit Photography — Crafting visual poetry
            </p>
            <div className="footer-links">
              <motion.a
                href="https://instagram.com/p_arpit4423"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
              >
                Instagram
              </motion.a>
              <motion.a
                href="mailto:prajapatiarpit704@gmail.com"
                whileHover={{ y: -2 }}
              >
                Contact
              </motion.a>
            </div>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  )
}

export default App
