"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typography, Box, Container } from "@mui/material";

export default function LoadingScreen() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Preparando sua experiência");

  // Simulate loading progress
  useEffect(() => {
    const texts = [
      "Preparando sua experiência",
      "Buscando as melhores ofertas",
      "Quase lá...",
      "Finalizando",
    ];

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 700);

    const textInterval = setInterval(() => {
      setLoadingText(texts[Math.floor(Math.random() * texts.length)]);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <Container
        maxWidth="md"
        className="flex-1 flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Typography variant="h3" component="h1" className="font-bold mb-2">
            Preparando sua viagem
          </Typography>
          <Typography variant="body1" color="textSecondary" className="mb-8">
            {loadingText}...
          </Typography>
          {/* Progress Bar */}
          <Box className="w-full max-w-md mx-auto bg-gray-100 rounded-full h-2 overflow-hidden mt-4">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </Box>
        </motion.div>

        {/* Travel Icons */}
        <div className="flex justify-center gap-16 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <svg
              className="w-12 h-12 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M21,11.5v-1c0-0.8-0.7-1.5-1.5-1.5H16V6.5C16,5.7,15.3,5,14.5,5H9.5C8.7,5,8,5.7,8,6.5V9H3.5C2.7,9,2,9.7,2,10.5v1
                C2,11.8,2.2,12,2.5,12h19C21.8,12,22,11.8,22,11.5z M9.5,6.5h5V9h-5V6.5z M18,16.5c0,0.8-0.7,1.5-1.5,1.5S15,17.3,15,16.5
                s0.7-1.5,1.5-1.5S18,15.7,18,16.5z M9,16.5c0,0.8-0.7,1.5-1.5,1.5S6,17.3,6,16.5S6.7,15,7.5,15S9,15.7,9,16.5z M20,14.5
                c0-0.3-0.2-0.5-0.5-0.5h-15C4.2,14,4,14.2,4,14.5V18h1.5c0,1.4,1.1,2.5,2.5,2.5S10.5,19.4,10.5,18h3c0,1.4,1.1,2.5,2.5,2.5
                s2.5-1.1,2.5-2.5H20V14.5z"
              />
            </svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <svg
              className="w-12 h-12 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.57 10.66c-.13-.19-.29-.35-.46-.48L20 10.12V7c0-1.1-.9-2-2-2h-4.18C13.27 4.39 12.64 4 12 4s-1.27.39-1.82 1H6c-1.1 0-2 .9-2 2v3.12l-.11.06c-.17.13-.33.29-.46.48-.31.45-.43.99-.43 1.34v4.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V16h10v2.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-4.5c0-.35-.12-.89-.43-1.34zM10 7.5h4c.83 0 1.5.67 1.5 1.5v1c0 .83-.67 1.5-1.5 1.5h-4c-.83 0-1.5-.67-1.5-1.5V9c0-.83.67-1.5 1.5-1.5zM7.5 12c-.83 0-1.5-.67-1.5-1.5V9c0-.83.67-1.5 1.5-1.5S9 8.17 9 9v1.5c0 .83-.67 1.5-1.5 1.5zm9 0c-.83 0-1.5-.67-1.5-1.5V9c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v1.5c0 .83-.67 1.5-1.5 1.5z" />
            </svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <svg
              className="w-12 h-12 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8
                c0-4.41,3.59-8,8-8s8,3.59,8,8C20,16.41,16.41,20,12,20z M11,7h2v5h-2V7z M11,14h2v2h-2V14z"
              />
            </svg>
          </motion.div>
        </div>
      </Container>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-500 text-sm">
        <Typography variant="caption">
          © {new Date().getFullYear()} DestCINation. Todos os direitos
          reservados.
        </Typography>
      </footer>
    </div>
  );
}
