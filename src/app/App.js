import React, {useReducer} from 'react';
import './App.css';
import ToDoHome from '../components/Home';
import { ProtocolProvider } from '../providers/protocolProvider';
import { protocolReducer } from '../reducers/protocolReducer'
const initialState = {
  protocolItems: []
};


const App = () => {

  const state = useReducer(protocolReducer, initialState);
  return (
    <div className="App">
      <ProtocolProvider value={state}> 
        <ToDoHome />
      </ProtocolProvider>
    </div>
  );
}

export default App;
