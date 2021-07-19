import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '../components/Button';
import { Item } from '../components/Item';
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
  const [newItem, setNewItem] = useState('');
  const collectionId = params.id;

  const { title, items } = useCollection(collectionId);

  async function handleSendItem(event: FormEvent) {
    event.preventDefault();

    if (newItem.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in');
    }

    const item = {
      description: newItem,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
    };

    await database.ref(`collections/${collectionId}/items`).push(item);
    setNewItem('');
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
          <h1>Coleção / Hobby {title}</h1>
          {items.length > 0 && <span>{items.length} item(s)</span>}
        </div>

        <form onSubmit={handleSendItem}>
          <textarea
            placeholder="Identificação do item a incluir na coleção"
            onChange={event => setNewItem(event.target.value)}
            value={newItem}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar um item, <button>faça seu login</button>.</span>
            )}
            <Button type="submit" disabled={!user}>Enviar item</Button>
          </div>
        </form>

        <div className="collection-list">
          {items.map(item => {
            return (
              <Item
                key={item.id}
                description={item.description}
                author={item.author}
              >
              </Item>
            );
          })}

        </div>
      </main>
    </div>
  );
}