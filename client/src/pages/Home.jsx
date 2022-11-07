import { Link } from "react-router-dom";
import { greetings } from "../helpers/momentHelper";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";

const Home = () => {
  const { firstName, isManager, isAdmin } = useAuth();

  useTitle(`Home - VTAAPP | UCC-Congress: ${firstName}`);

  // const date = new Date();
  // const today = new Intl.DateTimeFormat("en-US", {
  //   dateStyle: "full",
  //   timeStyle: "long",
  // }).format(date);

  // const content = (
  //   <section className="welcome">
  //     <p>{today}</p>

  //     <h1 className="text-red-300">Welcome {firstName}!</h1>

  //     <p>
  //       <Link to="/dash/notes">View techNotes</Link>
  //     </p>

  //     <p>
  //       <Link to="/dash/notes/new">Add New techNote</Link>
  //     </p>

  //     {(isManager || isAdmin) && (
  //       <p>
  //         <Link to="/dash/users">View User Settings</Link>
  //       </p>
  //     )}

  //     {(isManager || isAdmin) && (
  //       <p>
  //         <Link to="/dash/users/new">Add New User</Link>
  //       </p>
  //     )}
  //   </section>
  // );

  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Page header */}
        <div className="my-8">
          <h1 className="text-lg md:text-2xl text-slate-800 font-bold">
            {greetings()}, {firstName}
          </h1>
        </div>

        <div className="border-t border-slate-200"></div>
      </div>
    </main>
  );
};
export default Home;
