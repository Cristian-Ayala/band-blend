import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RoutesReact from "@/routes/RoutesReact.tsx";
import Header from "@/components/common/Header.tsx";
import Footer from "@/components/common/Footer.tsx";
import { esES } from "@mui/x-date-pickers/locales";
import { esES as coreEsES } from "@mui/material/locale";

const darkTheme = createTheme(
  {
    palette: {
      mode: "dark",
    },
  },
  esES,
  coreEsES,
);

export default function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="flex min-h-screen flex-col bg-gray-950">
          <Header />
          <RoutesReact />
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}
