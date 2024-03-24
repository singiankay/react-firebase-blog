import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    if (result) {
      navigate("/");
    }
  };
  return (
    <div className="items-center">
      <h1 className="text-2xl">Sign-in</h1>
      <div className="flex items-center">
        <button
          onClick={signInWithGoogle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
