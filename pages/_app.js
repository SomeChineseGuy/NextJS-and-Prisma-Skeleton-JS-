import "@/styles/globals.css";
import "../styles/tailwind.css";
import Layout from "./components/Layout";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import UserContext from "@/context/userInfoContext";
import { PrismaClient } from "@prisma/client";


export default function App({ Component, pageProps, users}) {
  console.log(users)
  return (
    <UserProvider>
      <UserContext.Provider value={pageProps}>
      <Layout users={pageProps}>
        <Component {...pageProps} />
      </Layout>
      </UserContext.Provider>
    </UserProvider>
  );
}


export async function getStaticProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany()
  return {
    props: {users}
  };
}