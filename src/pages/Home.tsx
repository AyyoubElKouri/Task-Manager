import HomeHeader from "@/components/layouts/Header";
import Features from "@/components/home/Features";
import HeroSection from "@/components/home/HeroSection";
import Footer from "@/components/layouts/Footer";

const Home = () => {
    return (
        <div className=" bg-surface-dark-1">
            <HomeHeader />
            <HeroSection />
            <Features />
            <Footer />
        </div>
    );
};

export default Home;
