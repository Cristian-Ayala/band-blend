import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RoutesReact from "@/routes/RoutesReact.tsx";
import Header from "@/components/common/Header.tsx";
import Footer from "@/components/common/Footer.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-950">
          <Header />
          <RoutesReact />
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}
