import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Navbar } from "../../Components/Navbar";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Target, 
  Rocket 
} from "lucide-react";

export const Landing = () => {
  return (
    <div className="bg-gradient-to-br from-primary-100 to-primary-200 min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 flex-grow flex items-center justify-center">
        <div className="text-center max-w-4xl mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600"
          >
            Welcome to the{" "}
            <Typewriter
              words={[" Placement Gateway"]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={80}
              delaySpeed={1000}
            />
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl text-gray-700 mb-8 leading-relaxed"
          >
            At IIT Goa, we take pride in our outstanding placement track record. 
            Our students are equipped with the skills and knowledge required to 
            excel in their careers. With leading organizations like Google, 
            Microsoft, Infosys, and Wipro recruiting from us, we ensure every 
            student has access to world-class opportunities.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition-all">
              <Trophy className="mx-auto text-yellow-500 mb-4" size={48} />
              <h3 className="font-bold text-xl mb-2">Highest Package</h3>
              <p className="text-2xl font-extrabold text-primary-600">₹42 LPA</p>
            </div>
            
            <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition-all">
              <Target className="mx-auto text-green-500 mb-4" size={48} />
              <h3 className="font-bold text-xl mb-2">Average Package</h3>
              <p className="text-2xl font-extrabold text-primary-600">₹12 LPA</p>
            </div>
            
            <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition-all">
              <Rocket className="mx-auto text-blue-500 mb-4" size={48} />
              <h3 className="font-bold text-xl mb-2">Total Offers</h3>
              <p className="text-2xl font-extrabold text-primary-600">250+</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};