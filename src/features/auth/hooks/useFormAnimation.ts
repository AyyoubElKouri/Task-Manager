import { useLayoutEffect, useRef, useState } from "react";

export const useFormAnimation = () => {
    const formReference = useRef<HTMLFormElement>(null);
    const [messageStart, setMessageStart] = useState<number>(0);

    useLayoutEffect(() => {
        function updatePosition() {
            if (formReference.current) {
                const rect = formReference.current.getBoundingClientRect();
                const absoluteY = rect.top + window.scrollY;
                setMessageStart(absoluteY);
            }
        }
        updatePosition();

        window.addEventListener("resize", updatePosition);

        return () => {
            window.removeEventListener("resize", updatePosition);
        };
    }, []);

    return {
        formReference,
        messageStart,
        setMessageStart,
    };
};

