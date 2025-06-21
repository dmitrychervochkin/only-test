import { useMemo, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Keyboard, Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { ArrowBtn } from "../ArrowBtn";

interface SliderContainerProps {
    className?: string;
    DATA: DataItem[];
    activeIndex?: number | undefined;
    isHidden: boolean;
}
type DataItem = {
    id: number;
    label: string;
    start: number;
    end: number;
    events: { id: number; year: number; description: string }[];
};

const SliderContainer = ({
    className,
    DATA,
    activeIndex,
    isHidden,
}: SliderContainerProps) => {
    const swiperRef = useRef<SwiperClass | null>(null);
    const slides = useMemo(
        () =>
            typeof activeIndex === "number" && DATA[activeIndex]
                ? DATA[activeIndex].events
                : [],
        [activeIndex, DATA]
    );

    const handlePrev = () => {
        swiperRef.current?.slidePrev();
    };
    const handleNext = () => {
        swiperRef.current?.slideNext();
    };

    return (
        <div className={className}>
            <Swiper
                onSwiper={(swiper: SwiperClass) => (swiperRef.current = swiper)}
                mousewheel={true}
                keyboard={true}
                pagination={true}
                slidesPerView={"auto"}
                spaceBetween={80}
                modules={[Pagination, Mousewheel, Keyboard]}
                className="mySwiper"
                grabCursor={true}
            >
                {!isHidden &&
                    slides.map((event, index) => (
                        <SwiperSlideCard key={event.id}>
                            <div>
                                <h3>{event.year}</h3>
                                <p>{event.description}</p>
                            </div>
                        </SwiperSlideCard>
                    ))}
            </Swiper>
            <ArrowBtn className="nav-btn nav-btn-left" onClick={handlePrev}>
                {"<"}
            </ArrowBtn>
            <ArrowBtn className="nav-btn nav-btn-right" onClick={handleNext}>
                {">"}
            </ArrowBtn>
        </div>
    );
};

export const Slider = styled(SliderContainer)<{ isHidden: boolean }>`
    position: relative;
    top: 250px;

    .swiper {
        margin: 0 70px;
        transition: opacity 0.8s ease;
        opacity: ${(p) => (p.isHidden ? 0 : 1)};

        @media (max-width: 768px) {
            margin: 0;
        }
    }

    .nav-btn-left {
        position: absolute;
        bottom: 100px;
        left: 10px;
    }
    .nav-btn-right {
        position: absolute;
        bottom: 100px;
        right: 10px;
    }
    .nav-btn {
        opacity: ${(p) => (p.isHidden ? 0 : 1)};
        
        @media (max-width: 768px) {
            display: none;
        }
    }
    @media (max-width: 768px) {
        top: 0;

        .swiper-slide {
            transition: opacity 0.3s;
            opacity: 0.3;
        }
        .swiper-slide-active {
            opacity: 1;
        }
        .swiper-slide:last-child {
            opacity: 1;
        }
    }
`;

const SwiperSlideCard = styled(SwiperSlide)`
    width: 350px;
    height: 200px;
    background-color: transparent;
    border-radius: 10px;

    h3 {
        font-family: "Bebas Neue", sans-serif;
        color: #3877ee;
    }

    p {
        color: #42567a;
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
    }

    @media (max-width: 768px) {
        width: 200px;
        height: 300px;
    }
`;
