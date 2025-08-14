import { Header } from "@components/layouts/Header";
import { Footer } from "@components/layouts/Footer";

import { Features } from "@marketing/components/Features";
import { HeroSection } from "@marketing/components/HeroSection";

const Home = () => {
    return (
        <div className=" bg-surface-dark-1">
            <Header />
            <HeroSection />
            <Features />
            <Footer />
        </div>
    );
};

export default Home;
