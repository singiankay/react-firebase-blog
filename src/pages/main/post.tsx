import {
  addDoc,
  deleteDoc,
  getDocs,
  collection,
  query,
  where,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { IPost } from "./main";
interface Props {
  post: IPost;
}

interface Like {
  id: string;
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<Like[] | null>(null);
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));
  const isLiked = likes?.find((like) => like.userId === user?.uid);

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ id: doc.data().id, userId: doc.data().userId }))
    );
  };

  const addLike = async () => {
    try {
      const result = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        const likeDataToAdd = { userId: user.uid, id: result.id };
        setLikes((prev) => (prev ? [...prev, likeDataToAdd] : [likeDataToAdd]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) => prev && prev.filter((like) => like.id !== likeId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="bg-gray-100 shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="py-2">
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        </div>
        <div className="py-2">
          <p className="text-gray-600">{post.description}</p>
        </div>
        <div className="py-2">
          <p className="text-xs italic text-right">- {post.username}</p>
        </div>
        <div className="flex justify-between items-center py-4">
          <span className="text-gray-500">
            {likes && `${likes.length} likes`}
          </span>
          <button
            className="flex-right text-white px-4 py-2 hover:bg-gray-200 rounded"
            onClick={!isLiked ? addLike : removeLike}
          >
            {!isLiked ? <>&#128077;</> : <>&#128078;</>}
          </button>
        </div>
      </div>
    </div>
  );
};
