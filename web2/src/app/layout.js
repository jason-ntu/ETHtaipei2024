import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'
import { AuthProvider } from "./context/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Circoda",
  description: "eth taipei 2024 hackathon project",
};

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </AuthProvider>
    </ThemeProvider>

  );
}
