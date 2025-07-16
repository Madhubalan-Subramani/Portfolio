import { motion } from "framer-motion";
import TimelineCard from "../../components/TimelineCard";

const experiences = [
  {
    year: "2023 - Present",
    role: "UI UX Developer",
    company: "Swithin & Sherwin Pvt Ltd",
    description:
      "I developed responsive web applications using React.js, creating 60+ reusable screens with optimized architecture. I also built a real-time clothing personalization feature that boosted user conversions by 45%, delivering intuitive and engaging user experiences."  },
  {
    year: "2022 - 2023",
    role: "Software Developer",
    company: "DocEngage Pvt Ltd",
    description: "I upgraded and maintained UI for healthcare modules using React.js, ensuring responsive design and consistent user experience. I implemented key usability features that improved task efficiency by 30% and resolved 1,000+ frontend issues, enhancing system stability."
  },
];

const education = [
  {
    year: "2018 - 2022",
    role: "ENGINEERING DEGREE",
    company: "ANNA UNIVERSITY",
    description:
      "Earned a B.E. in Mechanical Engineering from Bannari Amman Institute of Technology with an 8.4 CGPA, showcasing strong analytical skills and a passion for innovation.",
  },
  {
    year: "2016 - 2018",
    role: "HIGHER SECONDARY SCHOOL",
    company: "STATE BOARD",
    description:
      "Completed 11th and 12th in the Bio-Maths stream at Shri Vidhya Bharathi Metric Hr. Sec. School with 73.33%.",
  },
  {
    year: "2015 - 2016",
    role: "SECONDARY SCHOOL",
    company: "STATE BOARD",
    description:
      "Scored 92% in 10th from Golden Spark Metric Hr. Sec. School, showcasing strong academic performance and dedication to excellence.",
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

      <div className="mt-10 flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col gap-4 w-full lg:w-1/2 items-end text-start">
          {experiences.map((item, index) => (
            <TimelineCard
              key={index}
              item={item}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-1/2 items-end text-start">
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
