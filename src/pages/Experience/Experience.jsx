import { motion } from "framer-motion";
import TimelineCard from "../../components/TimelineCard";

const experiences = [
  {
    year: "2025 Aug - Present",
    role: "Software Developer",
    company: "Neumeric Technology Corp",
    description:
      "Architected enterprise React.js & TypeScript web apps—including CryptoTrace blockchain UTXO lineage visualization, Smart City ITMS real-time telemetry dashboards (50+ endpoints, SSE), and the BEL Traceability machine-handshake interface with centralized Redux.",
  },
  {
    year: "2023 Sep - 2025 Aug",
    role: "UI UX Developer",
    company: "Swithin & Sherwin Pvt Ltd",
    description:
      "Built responsive React.js web apps with 60+ reusable screens and a real-time clothing personalization feature.",
  },
  {
    year: "2022 Jul - 2023 Sep",
    role: "Software Developer",
    company: "DocEngage Informative Pvt Ltd",
    description:
      "Modernized 7 core healthcare modules using React.js and Redux, shipping 5+ usability features and resolving 300+ production tickets to boost operational efficiency and system stability.",
  },
];

const education = [
  {
    year: "2018 Jun - 2022 Jun",
    role: "ENGINEERING DEGREE",
    company: "ANNA UNIVERSITY",
    description:
      "Earned a B.E. in Mechanical Engineering from Bannari Amman Institute of Technology with an 8.4 CGPA, showcasing strong analytical skills and a passion for innovation.",
  },
  {
    year: "2016 Jun - 2018 Mar",
    role: "HIGHER SECONDARY SCHOOL",
    company: "STATE BOARD",
    description:
      "Completed 11th and 12th std in the Bio-Maths stream at Shri Vidhya Bharathi Metric Hr. Sec. School with 73.33%.",
  },
  {
    year: "2015 Jun - 2016 Mar",
    role: "SECONDARY SCHOOL",
    company: "STATE BOARD",
    description:
      "Scored 92% in 10th std from Golden Spark Metric Hr. Sec. School, showcasing strong academic performance and dedication to excellence.",
  },
];

const Experience = () => {
  return (
    <div className="text-center text-white flex flex-col items-center justify-center min-h-screen py-8">
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.7 }}
        className="flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.7 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            Exper<span className="text-[#8749f2]">ience & Education</span>
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "15vh", opacity: 1 }}
            transition={{ duration: 4, delay: 0.2, ease: "easeOut" }}
            className=" h-[3.5px] rounded bg-[#8749f2] mt-2 mx-auto"
          />
        </motion.div>
      </motion.div>

      <div className="mt-10 flex flex-col lg:flex-row gap-8 w-full">
        <div className="flex flex-col gap-4 w-full lg:w-1/2 pl-3 md:pl-0 items-end text-start">
          {experiences.map((item, index) => (
            <TimelineCard
              key={index}
              item={item}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-1/2 pl-3 md:pl-0 items-end text-start">
          {education.map((item, index) => (
            <TimelineCard
              key={index}
              item={item}
              isLast={index === education.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
