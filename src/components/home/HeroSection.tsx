import heroImage from "../../assets/HeroImage.png";
import { Button } from "../ui/Button";

const LABELS = {
    title: "Start Organizing Your Life",
    subtitle:
        "With a task-oriented approach, you can split your massive and hard tasks into small tasks that can be done easily and quickly",
    actionButton: "Get Started",
};

const HeroSection = () => {
    return (
        <div className="h-120 flex items-center justify-between px-12">
            <div className="flex flex-col gap-5">
                <h1 className="text-text-primary text-4xl font-bold">
                    {LABELS.title}
                </h1>
                <p className="text-text-secondary text-xl w-160 font-medium">
                    {LABELS.subtitle}
                </p>
                <Button className="w-30">{LABELS.actionButton}</Button>
            </div>
            <img
                src={heroImage}
                alt="Image for tasks"
                className="w-[40%] rounded-2xl border-2"
            />
        </div>
    );
};

export default HeroSection;
