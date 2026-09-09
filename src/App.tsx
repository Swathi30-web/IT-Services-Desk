import { BrowserRouter, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";

const Layout = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  const isAuthPage = location.pathname === "/login" || !currentUser;

  if (isAuthPage) {
    return (
      <main className="min-h-screen bg-gray-50">
        <AppRoutes />
      </main>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0">
        <Navbar />

        <main className="flex-1 overflow-y-auto">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Layout />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;