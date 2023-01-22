import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { ContextProvider } from "./context";
import { Clients, Flights, MenuLayout, Reservations } from "./components";
import './App.css'
import { Login } from "./components/login";
import { ProtectedRoute } from "./protected-route";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
});

function App() {
  return (
    <div className="app">
      <Router>
        <QueryClientProvider client={queryClient}>
          <ContextProvider>
            <MenuLayout />
            <div style={{ padding: "15px", width: '100%' }}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/clients" element={<ProtectedRoute />} >
                  <Route path="/clients" element={<Clients />} />
                </Route>
                <Route path="/flights" element={<Flights />} />
                <Route path="/reservations" element={<ProtectedRoute />} >
                  <Route path="/reservations" element={<Reservations />} />
                </Route>
              </Routes>
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
          </ContextProvider>
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;
