import React from "react";
import Navbar from "../components/common/Navbar";
import HeroSection from "../components/common/HeroSection";
import ServicesSection from "../components/common/ServicesSection";
import ContactSection from "../components/common/ContactSection";
import Footer from "../components/common/Footer";

const Landing = () => {
    return (
        <>
        <Navbar />
        <main>
            <section id="home">
                <HeroSection />
            </section>
            <section id="services">
                <ServicesSection />
            </section>
            <section id="contact">
                <ContactSection />
            </section>
        </main>
        <Footer />
        </>
    );
};

export default Landing;
