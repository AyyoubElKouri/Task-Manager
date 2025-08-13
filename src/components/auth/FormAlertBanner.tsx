import { motion } from "framer-motion";

export function FormAlertBanner({
    type,
    message,
    startYPosition,
}: {
    type: "error" | "success";
    message: string;
    startYPosition: number;
}) {
    return (
        <motion.div
            key="error-message"
            initial={{ y: startYPosition, opacity: 0 }}
            animate={{ y: startYPosition - 33, opacity: 1 }}
            exit={{ y: startYPosition, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute top-0 ${
                type === "error"
                    ? "bg-accent-danger hover:bg-accent-danger-hover"
                    : "bg-accent-success hover:bg-accent-success-hover"
            } w-90 h-10 rounded-t-lg flex justify-center pt-1 z-20 text-text-primary`}
        >
            {message}
        </motion.div>
    );
}
