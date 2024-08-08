import "./App.css";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/core/DashboardPage";
import BookCatalogPage from "./pages/bookCatalog/BookCatalogPage";
import BookIssuePage from "./pages/bookIssue/BookIssuePage";
import LoginPage from "./pages/auth/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayout from "./components/AppLayout";
import MemberPage from "./pages/member/MemberPage";
import UserAccountListPage from "./pages/userAcc/UserAcounts";
import CreateMemberPage from "./pages/member/CreateMemberPage";
import MemberInformationPage from "./pages/member/MemberInformationPage";

function App() {
  return (
    <Routes>
      
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/user-account">
          <Route index element={<UserAccountListPage />} />
        </Route>
        <Route path="/book-catalog" element={<BookCatalogPage />} />
        <Route path="/book-issue" element={<BookIssuePage />} />

        <Route path="/member">
          <Route index element={<MemberPage />} />
          <Route path="create" element={ <CreateMemberPage /> }/>
        </Route>
        <Route path="/detail/:id" element={<MemberInformationPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
