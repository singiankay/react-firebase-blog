import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export interface CreateFormInterface {
  title: string;
  description?: string;
}

export const CreateForm = () => {
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string(),
  });
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormInterface>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data: CreateFormInterface) => {
    const result = await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    if (result) navigate("/");
  };

  return (
    <div className="bg-gray-500 w-full max-w-xl">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onCreatePost)}
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            {...register("title")}
          />
          {errors.title?.message && (
            <p className="text-red-700 text-right">{errors.title?.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            {...register("description")}
          ></textarea>
          {errors.description?.message && (
            <p className="text-red-700 text-right">
              {errors.description?.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <input
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            value="Create Post"
          />
        </div>
      </form>
    </div>
  );
};
