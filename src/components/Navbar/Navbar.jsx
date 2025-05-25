import CommonButton from "../Buttons/CommonButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { scroller } from "react-scroll";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    scroller.scrollTo("home", {
      duration: 0,
      smooth: false,
      offset: -60,
    });
  }, []);

  const navItems = [
    { link: "home", name: "Home" },
    { link: "about", name: "About" },
    { link: "skills", name: "Skills" },
    { link: "experience", name: "Experience" },
    { link: "projects", name: "Projects" },
  ];

  const handleToggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const handleCloseMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 w-full bg-black z-50">
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left - Title */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-shrink-0 flex items-center"
          >
            <h1 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-100 to-violet-600">
              Madhu's Portfolio
            </h1>
          </motion.div>

          {/* Middle - Desktop nav */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                    delay: 0.2 + index * 0.15,
                  }}
                >
                  <ScrollLink
                    to={item.link}
                    smooth={true}
                    duration={500}
                    offset={-60}
                    spy={true}
                    activeClass="active-nav"
                    className="relative group text-white hover:text-[#7c3aed] cursor-pointer font-medium transition-all duration-300"
                  >
                    {item.name}
                    <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 h-[3px] bg-[#7c3aed] rounded-full after:transition-all duration-300 w-0 group-hover:w-[40px] group-[.active-nav]:w-[40px]"></span>
                  </ScrollLink>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Contact Button (Desktop only) */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden md:block"
          >
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              offset={-60}
              spy={true}
            >
              <CommonButton name="Contact" />
            </ScrollLink>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="md:hidden flex items-center"
          >
            <FontAwesomeIcon
              icon={isMobileMenuOpen ? faTimes : faBars}
              className="text-white text-[22px] cursor-pointer"
              onClick={handleToggleMenu}
            />
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { y: 0, opacity: 1, pointerEvents: "auto" },
          closed: { y: -20, opacity: 0, pointerEvents: "none" },
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="md:hiddenbg-white/10 backdrop-blur-xl shadow px-6 pb-4 pt-2 space-y-4 flex flex-col justify-center items-center z-50 absolute top-16 left-0 w-full"
      >
        {navItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={false}
            variants={{
              open: { y: 0, opacity: 1 },
              closed: { y: -10, opacity: 0 },
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: isMobileMenuOpen ? 0.2 + index * 0.1 : 0,
            }}
          >
            <ScrollLink
              to={item.link}
              smooth={true}
              duration={500}
              offset={-60}
              spy={true}
              activeClass="active-nav"
              onClick={handleCloseMenu}
              className="relative group text-white text-sm font-medium hover:text-[#7c3aed] cursor-pointer transition-all duration-300"
            >
              {item.name}
              <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 h-[2px] bg-[#7c3aed] rounded-full transition-all duration-300 w-0 group-hover:w-[30px] group-[.active-nav]:w-[30px]"></span>
            </ScrollLink>
          </motion.div>
        ))}
      </motion.div>
    </nav>
  );
};

export default Navbar;
