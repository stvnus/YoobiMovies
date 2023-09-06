import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa"; 

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div className="flex items-center justify-center space-x-4">
        <p>Copyright &copy; {new Date().getFullYear()} stvnus </p>
        <a
          href="https://www.linkedin.com/in/steven-stefanus"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-2xl" />
        </a>
        <a
          href="https://github.com/stvnus"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-2xl" />
        </a>
        <a href="mailto:stvnus98@gmail.com"> 
          <FaEnvelope className="text-2xl" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
