import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import HomePage from "../pages/HomePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/skills" element={<Home />} />
      <Route path="/projects" element={<Home />} />
      <Route path="/experience" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
