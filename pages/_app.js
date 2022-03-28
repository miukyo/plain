import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import "@fontsource/poppins/latin.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute='class' enableSystem={true}>
        <Toaster position='bottom-right' />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
