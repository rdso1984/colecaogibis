import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';

import { Home } from './pages/Home';
import { NewCollection } from './pages/NewCollection';
import { Collection } from './pages/Collection';


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/collections/new" component={NewCollection} />
          <Route path="/collections/:id" component={Collection} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
