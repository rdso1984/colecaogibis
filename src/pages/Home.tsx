import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import createCollectionimage from '../assets/images/create-collection.png';
import illustrationCollection from '../assets/images/collections.png';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [collectionCode, setCollectionCode] = useState('');

  async function handleCreateCollection() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/collections/new');
  }

  async function handleJoinCollection(event: FormEvent) {
    event.preventDefault();

    if (collectionCode.trim() === '') {
      return;
    }

    const collectionRef = await database.ref(`collections/${collectionCode}`).get();

    if (!collectionRef.exists()) {
      alert('Collection does not exists.');
      return;
    }

    if (collectionRef.val().ended()) {
      alert('Collection already closed.');
      return;
    }

    history.push(`/collections/${collectionCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={createCollectionimage} alt="Figura simbolizando criação de coleção" />
        <p className="vertical-text">Icons made by <a href="https://www.flaticon.com/authors/flat-icons" title="Flat Icons">Flat Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
        <strong>Crie lista<br />de suas coleções e hobbies</strong>
        <p>Facilite sua organização</p>
        <p>E deixe outros apaixonados verem<br /> e interagirem com seus hobbies</p>
      </aside>
      <main>
        <div className="main-content">
          <div className="image">
            <img src={illustrationCollection} alt="Figura indicando coleção" />
            <p className="vertical-text">Icons made by <a href="https://www.flaticon.com/authors/ultimatearm" title="ultimatearm">ultimatearm</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
          </div>
          <div className="button-login">
            <button onClick={handleCreateCollection} className="create-collection">
              <img src={googleIconImg} alt="Logo do Google" />
              Faça LogIn
            </button>
            <div className="separator"> Crie sua coleção <br />Ou encontre uma de seu interesse</div>
          </div>
        </div>
      </main>
    </div>
  );
}