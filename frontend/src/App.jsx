import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Routes, Route } from "react-router-dom";
import Home from "./pages";
import Listing from "./pages";
import Header from "./components/Header";
import "./app.module.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
        <main>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<Listing />} />
      </Routes>
        </main>
    </QueryClientProvider>
  );
}

export default App;
