import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import SearchPage from "./pages/searchPage/SearchPage";
import School from "./pages/school/School";
import Login from "./pages/login/Login";
import Dashboard from "./pages/userDashboard/Dashboard";
import Favourite from "./pages/favoriteSchools/Favorite";
import Register from "./pages/register/Register";
import SchoolUpdate from "./pages/schoolUpdate/SchoolUpdate";
import { AuthContext } from "./context/AuthContext";
import { useContext, useEffect } from "react";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import initGA from "./googleAnalytics";
import RandomSearch from "./pages/randomSearch/RandomSearch";
import ScrollToTop from "./scrollToTop";
import TermsAndConditions from "./pages/termsAndConditions/TermsAndConditions";
import NotFound from "./pages/notFound/NotFound";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  // FOR GOOGLE ANALYTICS STARTS
  useEffect(() => {
    initGA();
  }, []);
  // FOR GOOGLE ANALYTICS ENDS

  // protected Routes
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }
    // else
    return children;
  };

  // LoggedIn already
  const LoggedIn = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user) {
      return <Navigate to="/" />;
    }
    // else
    return children;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ScrollToTop />
                <Home />
              </>
            }
          />
          <Route
            path="/search"
            element={
              <>
                <ScrollToTop />
                <SearchPage />
              </>
            }
          />
          <Route path="/random-search" element={<RandomSearch />} />
          <Route
            path="/school/:id"
            element={
              <>
                <ScrollToTop />
                <School />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route
            path="/login"
            element={
              <LoggedIn>
                <Login />
              </LoggedIn>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favoriteSchools"
            element={
              <ProtectedRoute>
                <Favourite />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <LoggedIn>
                <Register />
              </LoggedIn>
            }
          />
          <Route path="/update-school" element={<SchoolUpdate />} />
          <Route
            path="/reset-password/:token"
            element={
              <LoggedIn>
                <ResetPassword />
              </LoggedIn>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
