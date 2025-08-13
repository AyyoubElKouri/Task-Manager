import mokeImage from "../../assets/HeroImage.png";

interface FeatureProps {
    image: string;
    title: string;
    description: string;
}

// Indiviuel feature
const Feature = (props: FeatureProps) => {
    const { title, description } = props;

    return (
        <div className="bg-surface-dark-1 rounded-corner w-90 h-90 text-text-primary flex flex-col">
            <img src={mokeImage} alt="" className="w-full rounded-t-corner" />
            <span className="text-xl pt-3 px-4 font-medium">{title}</span>
            <span className="pt-1 text-text-tertiary px-4">{description}</span>
        </div>
    );
};

const Features = () => {
    const mockData = {
        image: "image",
        title: "Make you day more faster",
        description:
            "Make you day more faster Make you day more fasterMake you day more fasterMake you day more faster",
    };
    return (
        <div className="bg-surface-dark-2 h-120 flex justify-around items-center">
            <Feature {...mockData} />
            <Feature {...mockData} />
            <Feature {...mockData} />
        </div>
    );
};

export default Features;
