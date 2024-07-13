import { PrimeReactProvider } from "primereact/api";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {

  return (
    <PrimeReactProvider>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </PrimeReactProvider>
  );
}

export default App;
