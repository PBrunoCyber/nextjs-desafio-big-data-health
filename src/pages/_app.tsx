import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
// pages/_app.js
import { QueryClientProvider } from 'react-query'
import { Raleway, Roboto } from 'next/font/google';
import '../styles/globals.css';
import { queryClient } from "@/config/queryClient";
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from "@/context/CartContext";


const raleway = Raleway({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-raleway',
});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div id="root" className={`${raleway.variable} ${roboto.variable}`}>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
        <ToastContainer />
      </div>
    </QueryClientProvider>
  )
}
