import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Instagram, Linkedin, Github, Store } from 'lucide-react';
import DataTable from './components/DataTable';
import ThreeScene from './components/ThreeScene';
import Toolbar from './components/Toolbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <motion.header 
        className="bg-indigo-600 text-white p-4 shadow-md"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="stroke-current" size={24} />
            <h1 className="text-xl font-bold">Grid-ify</h1>
          </div>
          <p className="text-indigo-100">3D Data visualization</p>
        </div>
      </motion.header>
      
      <main className="flex-grow p-4 md:p-6 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 h-[calc(100vh-12rem)]">
          <div className="lg:col-span-2 h-full">
            <DataTable />
          </div>
          <div className="lg:col-span-3 h-full">
            <ThreeScene />
          </div>
        </div>
      </main>
      
      <Toolbar />
      

      <footer className="bg-gray-900 text-gray-400 py-6">
        <div className="container mx-auto px-4">
          <hr className="border-gray-700 mb-4" />
          <div className="text-center">
            <a
              href="http://aaroophan.onrender.com/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              &copy; 2025
              <img
                src="https://lh3.googleusercontent.com/a/ACg8ocKNRvtI3cvci9DHfzBfC3d0PgPneG86fZv7w5se1U5mfBgcNqXj4g=s83-c-mo"
                alt="Aaroophan"
                className="h-5 w-5 rounded-full"
              />
              Aaroophan
            </a>

            <ul className="flex justify-center gap-4 mt-4">
              <li>
                <a
                  href="http://aaroophan.onrender.com"
                  aria-label="Portfolio"
                  className="hover:text-white transition-colors duration-200"
                >
                  <Store size={15} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/aaroophan/?theme=dark"
                  aria-label="Instagram"
                  className="hover:text-white transition-colors duration-200"
                >
                  <Instagram size={15} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/aaroophan"
                  aria-label="LinkedIn"
                  className="hover:text-white transition-colors duration-200"
                >
                  <Linkedin size={15} />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Aaroophan"
                  aria-label="GitHub"
                  className="hover:text-white transition-colors duration-200"
                >
                  <Github size={15} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;