import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <PrimeReactProvider>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </PrimeReactProvider>
  );
}

export default App;
