import styled from "styled-components";

export const ArrowBtn = styled.button<{
    className?: string;
    inactive?: boolean;
}>`
    width: 50px;
    height: 50px;
    background-color: white;
    color: #42567a80;
    border: 1px solid #42567a60;
    font-size: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: color 0.3s ease, border 0.3s ease;

    &:hover {
        color: #42567a90;
        border: 1px solid #42567a90;
    }
    &:active {
        color: #42567a;
        border: 1px solid #42567a;
    }
    &:disabled {
        color: #42567a20;
        border: 1px solid #42567a20;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        width: 30px;
        height: 30px;
        font-size: 16px;
    }
`;
