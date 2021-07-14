import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseCollections = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  object: string;
  description: string;
}>

type CollectionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  object: string;
  description: string;
}

export function useCollection(collectionId: string) {
  const { user } = useAuth();
  const [objects, setObjects] = useState<CollectionType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const collectionRef = database.ref(`collections/${collectionId}`);

    collectionRef.on('value', collection => {
      const databaseCollection = collection.val();
      const firebaseCollections: FirebaseCollections = databaseCollection.object ?? {};

      const parsedCollections = Object.entries(firebaseCollections).map(([key, value]) => {
        return {
          id: key,
          author: value.author,
          object: value.object,
          description: value.description,
        }
      })

      setTitle(databaseCollection.title);
      setObjects(parsedCollections);
    })

    return () => {
      collectionRef.off('value');
    }
  }, [collectionId, user?.id]);

  return { objects, title }

}