import styled from "styled-components";
import { Circle, Crosshair, Slider } from "./components";
import { useState } from "react";

interface CircleSliderContainerProps {
    className?: string;
    DATA?: any;
}

const CircleSliderContainer = ({
    className,
    DATA,
}: CircleSliderContainerProps) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isDateAnimating, setIsDateAnimating] = useState(false);

    return (
        <div className={className}>
            <Crosshair />
            <Circle
                DATA={DATA}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                setIsDateAnimating={setIsDateAnimating}
            />
            <Slider
                DATA={DATA}
                activeIndex={activeIndex}
                isHidden={isDateAnimating}
            />
        </div>
    );
};

export const CircleSlider = styled(CircleSliderContainer)`
    margin-bottom: 100px;
`;
