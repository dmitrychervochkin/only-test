import styled from "styled-components";

interface CrosshairContainerProps {
    className?: string;
}

const CrosshairContainer = ({ className }: CrosshairContainerProps) => {
    return <div className={className}></div>;
};
export const Crosshair = styled(CrosshairContainer)`
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;

    &::before,
    &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #42567a20;
    }

    &::before {
        width: 1px;
        height: 100%;
    }

    &::after {
        width: 100%;
        height: 1px;
        top: 436px;
    }

    @media (max-width: 768px) {
        display: none;
    }
`;
