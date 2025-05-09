
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";


import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/analyzer" element={<ResumeAnalyzer />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
