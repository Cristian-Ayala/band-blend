import { Routes, Route } from "react-router-dom";
import Home from "@/pages/dashboard/Home.tsx";

const SearchPage = () => <h1>Search page</h1>;

export default function RoutesReact() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}
