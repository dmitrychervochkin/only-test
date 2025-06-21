import styled from "styled-components";

interface TitleContainerProps {
    className?: string;
}

const TitleContainer = ({ className }: TitleContainerProps) => {
    return (
        <div className={className}>
            <div className="title-line"></div>
            <div className="title-text">Исторические даты</div>
        </div>
    );
};
export const Title = styled(TitleContainer)`
    color: #42567a;
    font-weight: 700;
    font-size: 56px;
    line-height: 120%;
    height: 130px;
    position: absolute;
    top: 100px;
    display: flex;
    width: 100%;
    gap: 70px;

    .title-line {
        height: 130px;
        width: 5px;
        background-image: linear-gradient(180deg, #3877ee -5%, #ef5da8 85%);
    }
    .title-text {
        width: 300px;
    }

    @media (max-width: 768px) {
        font-size: 30px;
        width: 200px;
        top: 50px;
        gap: 0px;

        .title-line {
            width: 0px;
        }
        .title-text {
            left: 40px;
        }
    }
`;
