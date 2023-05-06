import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout(props) {
  return (
    <>
      <Navbar user={props.user}/>
      <Sidebar></Sidebar>
    </>
  );
}
