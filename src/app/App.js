import React, {useReducer} from 'react';
import './App.css';
import Home from '../components/Home';
import { ProtocolProvider } from '../providers/protocolProvider';
import { protocolReducer } from '../reducers/protocolReducer';


const initialState = {
  protocolItems: [],
  protocolDetails: {},
  protocolQuestions: {},
  protocolAnswers: {}
};

const App = () => {

  const state = useReducer(protocolReducer, initialState);
  return (
    <div className="App">
      <ProtocolProvider value={state}> 
        <Home />
      </ProtocolProvider>
    </div>
  );
}

export default App;
