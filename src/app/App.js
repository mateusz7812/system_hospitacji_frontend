import React, {useReducer} from 'react';
import './App.css';
import ToDoHome from '../components/Home';
import { ProtocolProvider } from '../providers/protocolProvider';
import { AcademicProvider } from '../providers/academicProvider';
import { protocolReducer } from '../reducers/protocolReducer'
import { HospitalizationCommitteeProvider } from '../providers/hospitalizationCommitteeProvider';
import { hospitalizationCommitteeReducer } from '../reducers/hospitalizationCommitteeReducer';
import { academicReducer } from '../reducers/academicReducer';
const initialState = {
  protocolItems: []
};
const initialState2 = {
  hospitalizationCommitteeItems: [],
  academicItems: []

};
const initialState3 = {
  academicItems: []

};
const App = () => {

  const state = useReducer(protocolReducer, initialState);
  const statee = useReducer(hospitalizationCommitteeReducer, initialState2);
  const stateee = useReducer(academicReducer, initialState3)
  return (
    <div className="App">
      <AcademicProvider value={stateee}>
      <HospitalizationCommitteeProvider value={statee}> 
        <ProtocolProvider value={state}> 
          <ToDoHome />
        </ProtocolProvider>
      </HospitalizationCommitteeProvider>
      </AcademicProvider>
    </div>
  );

}

export default App;
