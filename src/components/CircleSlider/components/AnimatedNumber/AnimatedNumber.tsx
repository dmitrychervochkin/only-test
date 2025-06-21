import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
    value: number;
    duration?: number;
}

export const AnimatedNumber = ({
    value,
    duration = 800,
}: AnimatedNumberProps) => {
    const [displayValue, setDisplayValue] = useState(value);
    const rafRef = useRef<number | null>(null);
    const startTimestamp = useRef<number | null>(null);
    const startValue = useRef<number>(value);

    useEffect(() => {
        if (value === displayValue) return;

        startValue.current = displayValue;
        startTimestamp.current = null;

        const step = (timestamp: number) => {
            if (!startTimestamp.current) startTimestamp.current = timestamp;

            const progress = Math.min(
                (timestamp - startTimestamp.current) / duration,
                1
            );
            const current = Math.floor(
                startValue.current + (value - startValue.current) * progress
            );

            setDisplayValue(current);

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(step);
            }
        };

        rafRef.current = requestAnimationFrame(step);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [value]);

    return <span>{displayValue}</span>;
};
