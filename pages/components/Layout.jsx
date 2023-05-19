import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children, users }) => {
  return (
    <div className="content">
      <Navbar users={users} />
      {children}
      <Footer />
    </div>
  )
}

export default Layout;