import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import "@fontsource/poppins/latin.css";
import "../styles/globals.css";
import { Navbar } from "../components/Homepage/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute='class' enableSystem={true}>
        <Toaster position='bottom-right' />
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
