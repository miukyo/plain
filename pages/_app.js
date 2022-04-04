import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import "@fontsource/poppins/latin.css";
import "../styles/globals.css";
import { Navbar } from "../components/Homepage/Navbar";
import NextNProgress from "nextjs-progressbar";
import { motion } from "framer-motion";

function MyApp({ Component, pageProps, router }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute='class' enableSystem={true}>
        <Toaster position='bottom-right' />
        <NextNProgress
          height={2}
          color='#7b61ff'
          options={{ showSpinner: false }}
        />
        <Navbar />
        <motion.div
          key={router.route}
          initial='initial'
          animate='animate'
          variants={{
            initial: {
              opacity: 0,
            },
            animate: {
              opacity: 1,
            },
          }}>
          <Component {...pageProps} />
        </motion.div>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
