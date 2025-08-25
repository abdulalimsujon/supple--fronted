import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { useThemeStore } from "./store/useThemeStore";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store.ts";
import { loadUser } from "./store/features/auth/authSlice.ts"; // 👈 import

const ThemeInitializer = () => {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    initializeTheme();
    dispatch(loadUser()); // 👈 load user from cookies when app mounts
  }, [initializeTheme, dispatch]);

  return <App />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeInitializer />
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
