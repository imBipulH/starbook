import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" elemRouteent={<Login />} />
          <Route path="registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
      <Registration />
    </>
  );
}

export default App;
