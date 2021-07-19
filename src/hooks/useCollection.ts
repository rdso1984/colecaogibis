import { useEffect, useState } from "react";

import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseItems = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  description: string;
}>

type ItemType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  description: string;
}

export function useCollection(collectionId: string) {
  const { user } = useAuth();
  const [items, setItems] = useState<ItemType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const collectionRef = database.ref(`collections/${collectionId}`);

    collectionRef.on('value', collection => {
      const databaseCollection = collection.val();
      const firebaseItems: FirebaseItems = databaseCollection.items ?? {};

      const parsedItems = Object.entries(firebaseItems).map(([key, value]) => {
        return {
          id: key,
          description: value.description,
          author: value.author,
        }
      })

      setTitle(databaseCollection.title);
      setItems(parsedItems);
    })

    return () => {
      collectionRef.off('value');
    }
  }, [collectionId, user?.id]);

  return { items, title }

}