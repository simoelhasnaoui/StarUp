import { motion, useScroll, useTransform } from 'framer-motion';
import { publicImage } from '../utils/imageUrl';
import { LOGO_GREEN } from '../data/menu';

export function AboutAndFooter() {
  const { scrollYProgress } = useScroll();
  
  // Parallax for the About image
  const aboutImageY = useTransform(scrollYProgress, [0.6, 1], [0, -60]);
  const aboutImageScale = useTransform(scrollYProgress, [0.6, 0.9], [1, 1.05]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      <section id="apropos" className="about-section">
        <div className="about-container">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="about-image"
            style={{ y: aboutImageY, scale: aboutImageScale }}
          >
            <img src={publicImage('Aproposimg.jpg')} alt="Notre intérieur" loading="lazy" />
            <div className="about-image__overlay" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            variants={containerVariants}
            className="about-content"
          >
            <motion.span variants={itemVariants} className="section-tag">L'Artisanat</motion.span>
            <motion.h2 variants={itemVariants} className="about-title">L’Excellence dans chaque détail</motion.h2>
            <motion.p variants={itemVariants} className="about-lead">
              Né d'une passion pour les saveurs authentiques, Starup Coffee réinvente l'expérience de la crêpe et du café contemporain.
            </motion.p>
            
            <motion.div variants={containerVariants} className="about-features">
              <motion.div variants={itemVariants} className="about-feature">
                <strong>Ingrédients Premium</strong>
                <p>Nous sélectionnons rigoureusement chaque ingrédient pour garantir une fraîcheur et un goût inégalés.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="about-feature">
                <strong>Savoir-Faire</strong>
                <p>Chaque crêpe est une œuvre d'art, préparée avec précision par nos experts passionnés.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer id="contact" className="site-footer">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="footer-container"
        >
          <motion.div variants={itemVariants} className="footer-brand">
            <div className="footer-logo-wrap">
              <img src={publicImage(LOGO_GREEN)} alt="Starup Coffee" className="footer-logo-img" />
            </div>
            <p>Une expérience gustative contemporaine, redéfinissant les standards de la crêperie moderne.</p>
            <div className="footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="mailto:contact@starup.coffee" aria-label="Gmail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
            </div>
          </motion.div>

          <div className="footer-nav">
            <motion.div variants={itemVariants} className="footer-col">
              <h4>Navigation</h4>
              <a href="#menu">Menu</a>
              <a href="#apropos">À Propos</a>
              <a href="#contact">Contact</a>
            </motion.div>
            <motion.div variants={itemVariants} className="footer-col">
              <h4>Horaires</h4>
              <p>Lun - Dim: 08h00 - 00h00</p>
            </motion.div>
            <motion.div variants={itemVariants} className="footer-col">
              <h4>Contact</h4>
              <p>Tamesna, Maroc</p>
              <a href="mailto:contact@starup.coffee">contact@starup.coffee</a>
              <p>+212 5XX XX XX XX</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
          className="footer-bottom"
        >
          <div className="footer-bottom-inner">
            <p>&copy; {new Date().getFullYear()} Starup Coffee. Tous droits réservés.</p>
            <div className="footer-legal">
              <a href="#">Mentions Légales</a>
              <a href="#">Confidentialité</a>
            </div>
          </div>
        </motion.div>
      </footer>
    </>
  );
}
