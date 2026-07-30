import { useEffect } from "react";
import Header from "./component/Header";
import AppRoute from "./AppRoute";
import Loading from "./component/Loading";
import SetLoadingInterceptors from "./interceptors/Loadinginterceptors";
import { useLoading } from "./hooks/useLoading";

function App() {
  const { hideLoading, showLoading } = useLoading();
  useEffect(() => {
    SetLoadingInterceptors({ hideLoading, showLoading });
  }, []);
  return (
    <>
      <Header />
      <Loading />
      <AppRoute />
    </>
  );
}

export default App;
