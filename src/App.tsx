import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { Button, Layout } from "antd";
import { ContextProvider } from "./context";
import { Clients, Flights, MenuLayout, Reservations, Flight } from "./components";
import './App.css'
import { Login } from "./components/login";
import { ProtectedRoute } from "./protected-route";
import Sider from "antd/es/layout/Sider";

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
            <Layout>
              <Sider>
                <MenuLayout />
              </Sider>
              <div className="routes-holder">
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/clients" element={<ProtectedRoute />} >
                    <Route path="/clients" element={<Clients />} />
                  </Route>
                  <Route path="/flights" element={<Flights />} />
                  <Route path="/flights/:id" element={<Flight />} />
                  <Route path="/reservations" element={<ProtectedRoute />} >
                    <Route path="/reservations" element={<Reservations />} />
                    <Route path="/reservations/:id" element={<Flight />} />
                  </Route>
                </Routes>
              </div>
            </Layout>
            <ReactQueryDevtools initialIsOpen={false} />
          </ContextProvider>
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;
