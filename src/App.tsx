import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter } from "react-router-dom";
import PublicRoutes from "./AppRoutes/PublicRoutes";

function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <PublicRoutes />
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;
