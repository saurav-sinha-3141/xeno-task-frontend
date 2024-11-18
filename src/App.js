import CampaignForm from "./Components/CampaignForm";
import CustomerForm from "./Components/CustomerForm";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import ViewHistory from "./Components/ViewHistory";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/customerform" element={<CustomerForm />} />
        <Route exact path="/campaignform" element={<CampaignForm />} />
        <Route exact path="/history" element={<ViewHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
