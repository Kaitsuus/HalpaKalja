import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './global.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yhdet",
  description: "Baarit samasta paikasta",
};


export default function RootLayout(props: any) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
         <AppRouterCacheProvider>
           <ThemeProvider theme={theme}>
             {children}
           </ThemeProvider>
         </AppRouterCacheProvider>
      </body>
    </html>
  );
}
