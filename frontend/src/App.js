import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./constants";
import { Header } from "./components/Header";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "antd";
import { useStore } from "./store";

const { Content } = Layout;

const queryClient = new QueryClient();

const Wrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const App = () => {
  const store = useStore();

  useEffect(() => {
    store.checkState();
  }, []);

  if (!store.isAuthorized) {
    return (
      <Routes>
        {routes.unAuthorized.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Routes>
    );
  }

  return (
    <Wrapper>
      <Layout>
        <Header />
        <Content>
          <Routes>
            {routes.authorized.map((route, i) => (
              <Route key={i} {...route} />
            ))}
          </Routes>
        </Content>
      </Layout>
    </Wrapper>
  );
};

export default App;
