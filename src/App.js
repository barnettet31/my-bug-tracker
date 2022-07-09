import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/nav-bar/navbar.component";
import { Dashboard } from "./routes/dashboard/dashboard.component";
import { Calendar } from "./routes/calendar/calendar.component";
import { Team } from "./routes/team/team.component";
import { Projects } from "./routes/projects/projects.component";
import { Documents } from "./routes/documents/documents.component";
import { Reports } from "./routes/reports/reports.component";
import { Login } from "./routes/login/login.component";
import { ProtectedRoute } from "./components/protected-route/protected-route.component";
import { AuthProvider } from "./services/authentication/authentication.context";
import { NewPassword } from "./routes/new-password/new-password.component";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <NavBar />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="team" element={<Team />} />
          <Route path="projects" element={<Projects />} />
          <Route path="documents" element={<Documents />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
export default App;
