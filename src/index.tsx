import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import App from "./App";
import AuthLayout from "./components/AuthLayout";
import "./index.css";
import Login from "./pages/login";
import AuthProvider from "./providers/AuthProvider";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to={"/contract"} />} />
        <Route element={<AuthLayout />}>
          <Route path="/contract" element={<App />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

reportWebVitals();
