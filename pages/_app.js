import "@/styles/globals.css";
import "../styles/tailwind.css";
import Layout from "./components/Layout";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import UserContext from "@/context/userInfoContext";


export default function App({ Component, pageProps}) {
  return (
    <UserProvider>
      <UserContext.Provider value={pageProps.users}>
      <Layout >
        <Component {...pageProps} />
      </Layout>
      </UserContext.Provider>
    </UserProvider>
  );
}
