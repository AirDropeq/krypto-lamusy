import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import TokenChart from "./components/TokenChart"
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TokenChart />
    </QueryClientProvider>
  );
}

export default App;
