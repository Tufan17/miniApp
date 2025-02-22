import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { Routes, Route } from "react-router-dom";
import RolePage from "../role";
import UserPage from "../users";
import LevelPage from "../levels";
import ContentPage from "../content";
import LevelCreatePage from "../levels/create";
import LevelUpdatePage from "../levels/update";
import ContentCreatePage from "../content/create";
import ContentUpdatePage from "../content/update";
import HomePage from "./home";
import ErrorBoundary from "../../components/ErrorBoundary";
import CefrPage from "../cefr";
import CefrCreatePage from "../cefr/create";
import CefrUpdatePage from "../cefr/update";
const DashboardPage = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <ErrorBoundary>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <div className="w-full flex justify-between items-center h-full px-2">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Header />
          </div>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <Navbar />
        </AppShell.Navbar>
        <AppShell.Main className="w-full h-full bg-gray-200">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/roles" element={<RolePage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/levels" element={<LevelPage />} />
            <Route path="/levels/create" element={<LevelCreatePage />} />
            <Route path="/levels/update/:id" element={<LevelUpdatePage />} />
            <Route path="/content" element={<ContentPage />} />
            <Route path="/content/create" element={<ContentCreatePage />} />
            <Route path="/content/update/:id" element={<ContentUpdatePage />} />
            <Route path="/cefr" element={<CefrPage />} />
            <Route path="/cefr/create" element={<CefrCreatePage />} />
            <Route path="/cefr/update/:id" element={<CefrUpdatePage />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </ErrorBoundary>
  );
};
export default DashboardPage;
