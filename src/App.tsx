import styled from "styled-components";
import "./App.css";
import { Title, CircleSlider } from "./components";

interface AppContainerProps {
    className?: string;
}

type Event = { id: number; year: number; description: string };
type DataItem = {
    id: number;
    label: string;
    start: number;
    end: number;
    events: Event[];
};

const DATA: DataItem[] = [
    {
        id: 1,
        label: "История",
        start: 1980,
        end: 1985,
        events: new Array(5).fill(0).map((_, i) => ({
            id: 7 + i,
            year: 1980 + i,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        })),
    },
    {
        id: 2,
        label: "Кино",
        start: 1985,
        end: 1990,
        events: new Array(5).fill(0).map((_, i) => ({
            id: 7 + i,
            year: 1985 + i,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        })),
    },
    {
        id: 3,
        label: "Литература",
        start: 1990,
        end: 2000,
        events: new Array(9).fill(0).map((_, i) => ({
            id: 7 + i,
            year: 1990 + i,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        })),
    },
    {
        id: 4,
        label: "Культура",
        start: 2000,
        end: 2010,
        events: new Array(9).fill(0).map((_, i) => ({
            id: 7 + i,
            year: 2000 + i,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        })),
    },
    {
        id: 5,
        label: "Образование",
        start: 2010,
        end: 2020,
        events: new Array(9).fill(0).map((_, i) => ({
            id: 7 + i,
            year: 2010 + i + 1,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        })),
    },
    {
        id: 6,
        label: "Наука",
        start: 2020,
        end: 2025,
        events: new Array(5).fill(0).map((_, i) => ({
            id: 7 + i,
            year: 2020 + i,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        })),
    },
];

const AppContainer = ({ className }: AppContainerProps) => {
    return (
        <div className={className}>
            <Title />
            <CircleSlider DATA={DATA} />
        </div>
    );
};

export const App = styled(AppContainer)`
    font-family: "PT Sans", sans-serif;
    margin: 0 auto;
    width: 100%;
    max-width: 1440px;
    height: 100vh;
    border-left: 1px solid #42567a20;
    border-right: 1px solid #42567a20;
    position: relative;
    box-sizing: border-box;

    @media (max-width: 768px) {
        border: none;
        padding: 0 20px;
    }
`;
