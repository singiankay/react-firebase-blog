import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";
export interface IPost {
  id: string;
  userId: string;
  description: string;
  title: string;
  username: string;
}

export const Main = () => {
  const [list, setList] = useState<IPost[] | null>(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[]);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="my-10">
        <h1 className="text-4xl">Posts</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {list?.map((post) => {
          return <Post post={post} key={post.id} />;
        })}
      </div>
    </div>
  );
};
