import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { CollectionCode } from '../components/CollectionCode';
import { useAuth } from '../hooks/useAuth';
import { useCollection } from '../hooks/useCollection';
import { database } from '../services/firebase';

import createCollectionImg from '../assets/images/create-collection.png';

import '../styles/collection.scss';

type CollectionParams = {
  id: string;
}

export function Collection() {
  const { user } = useAuth();
  const params = useParams<CollectionParams>();
  const [newObject, setNewObject] = useState('');
  const collectionId = params.id;

  const { objects, title } = useCollection(collectionId);

  async function handleSendObject(event: FormEvent) {
    event.preventDefault();

    if (newObject.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in');
    }

    const object = {
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      object: newObject,
      description: "descriptionTemp",
    };

    await database.ref(`collections/${collectionId}/`).push(object);
    setNewObject('');
  }

  return (
    <div id="page-collection">
      <header>
        <div className="content">
          <a href="/">
            <img src={createCollectionImg} alt="Imagem indicando uma coleção" />
          </a>
          <CollectionCode code={collectionId} />
        </div>
      </header>

      <main>
        <div className="collection-title">
          <h1>Collection {title}</h1>
          {objects.length > 0 && <span>{objects.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendObject}>
          <textarea
            placeholder="Identificação do objeto a incluir na coleção"
            onChange={event => setNewObject(event.target.value)}
            value={newObject}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt="{user.name}" />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar um objeto, <button>faça seu login</button>.</span>
            )}
            <Button type="submit" disabled={!user}>Enviar objeto</Button>
          </div>
        </form>




      </main>
    </div>
  );

}