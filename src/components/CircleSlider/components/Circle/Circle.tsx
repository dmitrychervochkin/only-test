import { useRef } from "react";
import styled from "styled-components";
import { SwiperClass } from "swiper/react";
import { ArrowBtn } from "../ArrowBtn";
import { AnimatedNumber } from "../AnimatedNumber";

type DataItem = {
    id: number;
    label: string;
    start: number;
    end: number;
    events: { id: number; year: number; description: string }[];
};

type CircleContainerProps = {
    className?: string;
    DATA: DataItem[];
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    setIsDateAnimating: (animating: boolean) => void;
};

const RADIUS = 265;
const CENTER = 265;

const formatIndex = (i: number): string => String(i).padStart(2, "0");

const CircleContainer = ({
    className,
    DATA,
    activeIndex,
    setActiveIndex,
    setIsDateAnimating,
}: CircleContainerProps) => {
    const angleStep: number = 360 / DATA.length;
    const swiperRef = useRef<SwiperClass | null>(null);
    const rotation: number = -angleStep * activeIndex;

    const handleDotClick = (idx: number): void => {
        if (idx === activeIndex) return;
        setIsDateAnimating(true);
        setActiveIndex(idx);

        setTimeout(() => {
            setIsDateAnimating(false);
            swiperRef.current?.slideTo(idx);
        }, 800);
    };

    const onNavigationClick = (direction: "prev" | "next"): void => {
        const newIndex =
            direction === "prev" ? activeIndex - 1 : activeIndex + 1;
        if (newIndex >= 0 && newIndex < DATA.length) {
            setIsDateAnimating(true);
            setActiveIndex(newIndex);

            setTimeout(() => {
                setIsDateAnimating(false);
                direction === "prev"
                    ? swiperRef.current?.slidePrev()
                    : swiperRef.current?.slideNext();
            }, 800);
        }
    };

    return (
        <div className={className}>
            <div className="date-container">
                <div className="start-date">
                    <AnimatedNumber value={DATA[activeIndex].start} />
                </div>
                <div className="end-date">
                    <AnimatedNumber value={DATA[activeIndex].end} />
                </div>
            </div>
            <div className="circle-container">
                <CircleWrapper rotation={rotation}>
                    {DATA.map((item, idx) => {
                        const angleDeg = angleStep * idx - 60;
                        const rad = (angleDeg * Math.PI) / 180;
                        const x = CENTER + RADIUS * Math.cos(rad);
                        const y = CENTER + RADIUS * Math.sin(rad);

                        return (
                            <Dot
                                key={item.id}
                                x={x}
                                y={y}
                                rotation={rotation}
                                active={idx === activeIndex}
                                onClick={() => handleDotClick(idx)}
                                title={item.label}
                            >
                                <span className="index">{idx + 1}</span>
                            </Dot>
                        );
                    })}
                </CircleWrapper>
                <div className="label-container">{DATA[activeIndex].label}</div>
            </div>
            <div className="nav-container">
                <div className="current-slide">
                    {formatIndex(activeIndex + 1)}/{formatIndex(DATA.length)}
                </div>
                <div className="nav-btns">
                    <ArrowBtn
                        className="nav-btn"
                        disabled={activeIndex === 0}
                        onClick={() => onNavigationClick("prev")}
                    >
                        {"<"}
                    </ArrowBtn>
                    <ArrowBtn
                        className="nav-btn"
                        disabled={activeIndex === DATA.length - 1}
                        onClick={() => onNavigationClick("next")}
                    >
                        {">"}
                    </ArrowBtn>
                </div>
            </div>
        </div>
    );
};

export const Circle = styled(CircleContainer)`
    width: 100%;
    height: 530px;
    margin: 0 auto;
    position: relative;
    top: 170px;

    .label-container {
        position: absolute;
        color: #42567a;
        font-weight: 700;
        font-size: 20px;
        top: 23px;
        left: 50%;
        transform: translateX(200px);

        @media (max-width: 768px) {
            display: none;
        }
    }

    .date-container {
        position: absolute;
        display: flex;
        font-size: 200px;
        gap: 70px;
        font-weight: 700;
        z-index: -1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .start-date {
            color: #3877ee;
        }
        .end-date {
            color: #ef5da8;
        }

        @media (max-width: 1000px) {
            font-size: 150px;
        }
        @media (max-width: 768px) {
            font-size: 60px;
            top: 50px;
            width: 100%;
            justify-content: center;
            padding: 50px 0;
            border-bottom: 1px solid #42567a;
        }
    }

    .circle-container {
        position: relative;
        width: 530px;
        margin: 0 auto;
    }

    .nav-container {
        position: absolute;
        left: 70px;
        bottom: 0;
        z-index: 10;

        .current-slide {
            color: #42567a;
            margin-bottom: 20px;

            @media (max-width: 768px) {
                margin-bottom: 10px;
            }
        }
        .nav-btns {
            display: flex;
            gap: 10px;
        }

        @media (max-width: 768px) {
            left: 0;
            bottom: -100px;
        }
    }

    @media (max-width: 768px) {
        height: 330px;
    }
`;

const CircleWrapper = styled.div<{ rotation: number }>`
    width: 530px;
    height: 530px;
    position: relative;
    border-radius: 50%;
    margin: 0 auto;
    border: 1px solid #42567a20;
    transition: transform 0.6s ease;
    transform: rotate(${(p) => p.rotation}deg);

    @media (max-width: 768px) {
        display: none;
    }
`;

const Dot = styled.div<{
    x: number;
    y: number;
    active: boolean;
    rotation: number;
}>`
    position: absolute;
    width: ${(p) => (p.active ? "50px" : "5px")};
    height: ${(p) => (p.active ? "50px" : "5px")};
    background: ${(p) => (p.active ? "#fff" : "#42567A")};
    border: ${(p) => (p.active ? "1px solid #42567A" : "none")};
    border-radius: 50%;
    left: ${(p) => p.x}px;
    top: ${(p) => p.y}px;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: width 0.3s ease, height 0.3s ease, border 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    color: #42567a;

    .index {
        display: ${(p) => (p.active ? "inline" : "none")};
        transform: rotate(${(p) => -p.rotation}deg);
    }

    &:hover {
        width: 50px;
        height: 50px;
        border: 1px solid #42567a;
        background-color: #fff;

        .index {
            display: inline;
            transform: rotate(${(p) => -p.rotation}deg);
        }
    }
`;
