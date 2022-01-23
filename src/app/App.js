import React, {useReducer} from 'react';
import './App.css';
import ToDoHome from '../components/Home';
import { ProtocolProvider } from '../providers/protocolProvider';
import { protocolReducer } from '../reducers/protocolReducer'
import { HospitationProvider } from '../providers/hospitationProvider';
import { hospitationReducer } from '../reducers/hospitationReducer'
const initialState = {
  protocolItems: []
};

const initialState3 = {
  hospitationItems: []
};

const App = () => {

  const state = useReducer(protocolReducer, initialState);
  const stateee = useReducer(hospitationReducer, initialState3);
  return (
    <div className="App">
      <HospitationProvider value={stateee}>
        <ProtocolProvider value={state}> 
          <ToDoHome />
        </ProtocolProvider>
      </HospitationProvider>
    </div>
  );
}

export default App;
