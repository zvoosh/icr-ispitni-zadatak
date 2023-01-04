import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Clients, Flights, MenuLayout, Reservations } from "./components";
import './App.css'

const queryClient = new QueryClient();

function App() {
  return (
    <div className="app">
      <Router>
        <QueryClientProvider client={queryClient}>
          <MenuLayout />
          <div style={{padding: "15px", width: '100%'}}>
            <Routes>
              <Route path="/" element={<Clients />} />
              <Route path="/flights" element={<Flights />} />
              <Route path="/reservations" element={<Reservations />} />
            </Routes>
          </div>
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;
