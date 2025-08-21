import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("../pages/Home/Home"));
const About = lazy(() => import("../pages/About/About"));
const HomePage = lazy(() => import("../pages/HomePage"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Home />} />
        <Route path="/projects" element={<Home />} />
        <Route path="/experience" element={<Home />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
