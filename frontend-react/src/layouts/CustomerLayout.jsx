import Footer from "../components/common/Footer.jsx";
import Header from "../components/common/Header.jsx";
import Sidebar from "../components/common/Sidebar.jsx";
import { useAuth } from "../hooks/useAuth.js";

export default function CustomerLayout({ screen, title, notice, onNavigate, onRefresh, children }) {
  const { currentUser, logout } = useAuth();

  return (
    <div className="app-shell">
      <Sidebar user={currentUser} screen={screen} onNavigate={onNavigate} />
      <main className="main">
        <Header title={title} user={currentUser} notice={notice} onRefresh={onRefresh} onLogout={logout} />
        {children}
        <Footer />
      </main>
    </div>
  );
}
