import "./App.css";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEditEventPage from "./pages/AddEditEventPage";
import PublicEventsListPage from "./pages/PublicEventsListPage";
import UserEventListPage from "./pages/UserEventListPage";
import ErrorPage from "./pages/ErrorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/events" element={<UserEventListPage />}></Route>
        <Route path="/addUpdateEvent/:id?" element={<AddEditEventPage />}></Route>
        <Route path="/" element={<PublicEventsListPage />}></Route>
        <Route path="/error" element={<ErrorPage />}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
