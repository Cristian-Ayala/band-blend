import Home from "@/pages/dashboard/Home.tsx";
import MembersIndex from "@/pages/members/MembersIndex";
import RolesIndex from "@/pages/roles/RolesIndex";
import SongsIndex from "@/pages/songs/SongsIndex.tsx";
import { Route, Routes } from "react-router-dom";

const SearchPage = () => <h1>Search page</h1>;

export default function RoutesReact() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/songs" element={<SongsIndex />} />
      <Route path="/roles" element={<RolesIndex />} />
      <Route path="/members" element={<MembersIndex />} />
    </Routes>
  );
}
