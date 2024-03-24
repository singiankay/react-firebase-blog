import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-white mx-4">
            Home
          </Link>
          {user ? (
            <Link to="/create-post" className="text-white mx-4">
              Create Post
            </Link>
          ) : (
            <Link to="/login" className="text-white mx-4">
              Login
            </Link>
          )}
        </div>
        <div className="flex items-center">
          {user && (
            <>
              <div className="inline-block text-white mx-4">
                <div className=" text-white mx-4">{user?.displayName}</div>
              </div>
              <div className="inline-block text-white mx-4">
                <img src={user?.photoURL || ""} alt="" width={25} height={25} />
              </div>
              <div className="inline-block text-white mx-4">
                <button onClick={signUserOut}>Logout</button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
