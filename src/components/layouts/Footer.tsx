export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="w-full h-15 flex justify-center items-center bg-surface-dark-3 text-text-primary">
            © {currentYear} . All rights reserved.
        </div>
    );
};
