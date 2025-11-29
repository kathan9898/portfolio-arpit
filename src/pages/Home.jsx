import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="min-h-screen bg-beige text-text-dark selection:bg-primary selection:text-white">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Services />
                <Portfolio />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
