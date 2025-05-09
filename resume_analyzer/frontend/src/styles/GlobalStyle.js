import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    /* CSS Reset */
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html {
        scroll-behavior: smooth;
        font-size: 16px;
    }

    body {
        font-family: 'Segoe UI', 'Roboto', sans-serif;
        background-color: #0f172a;
        color: #ffffff;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
    }

    input, textarea, button {
        font-family: inherit;
        outline: none;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    button {
        cursor: pointer;
    }

    /* Selection */
    ::selection {
        background-color: #64ffda;
        color: #0f172a;
    }

    /* Scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #334155;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: #1e293b;
    }
`;

export default GlobalStyle;
