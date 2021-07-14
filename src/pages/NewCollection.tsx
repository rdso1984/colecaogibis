import { Link, useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";

import illustrationCollection from "../assets/images/collections.png";
import coinImg from "../assets/images/create-collection.png";

import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/Button";

import '../styles/auth.scss';

export function NewCollection() {
  const { user } = useAuth();
  const history = useHistory();
  const [newCollection, setNewCollection] = useState('');
  const [newSearchCollection, setSearchCollection] = useState('');

  async function handleCreateCollection(event: FormEvent) {
    event.preventDefault();

    if (newCollection.trim() === '') {
      return;
    }

    const collectionRef = database.ref('collections');

    const firebaseCollection = await collectionRef.push({
      title: newCollection,
      authorId: user?.id,
    })

    history.push(`/collections/${firebaseCollection.key}`)
  }

  async function handleSearchCollection(event: FormEvent) {
    event.preventDefault();

    if (newSearchCollection.trim() === '') {
      return;
    }
    //TODO finish the function
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationCollection} alt="Ilustração simbolizando coleção" />
        <strong>Crie coleções e hobbies</strong>
        <p>Procure e interaja com<br />outros colecionadores</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={coinImg} alt="New Collection" />
          <form onSubmit={handleCreateCollection}>
            <input
              type="text"
              placeholder="Nome da Coleção"
              onChange={event => setNewCollection(event.target.value)}
              value={newCollection}
            />
            <Button type="submit">
              Criar coleção
            </Button>
          </form>

          <form onSubmit={handleSearchCollection}>
            <input
              type="text"
              placeholder="Qual tipo de coleção deseja procurar"
              onChange={event => setSearchCollection(event.target.value)}
              value={newSearchCollection}
            />
            <Button type="submit">
              Procurar coleção
            </Button>

          </form>

          <p>
            Voltar para <Link to="/">página inicial</Link>
          </p>
        </div>
      </main>
    </div>
  )

}