import { Provider } from "react-redux";
import { store } from "@/store";
import { AppPropsWithLayout } from "./types";
import { Standard } from "@/layouts/standard";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Standard;
  return <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>;
}
