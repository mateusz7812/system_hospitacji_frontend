import { useContext } from "react";
import { HospitalizationCommitteeContext } from "../../providers/hospitalizationCommitteeProvider";
import { ProtocolContext } from "../../providers/protocolProvider";

export const useHospitalizationCommitteeContext = () => {
  const hospitalizationCommitteeContext = useContext(HospitalizationCommitteeContext);
  return {
      statee: hospitalizationCommitteeContext[0],
      dispatch: hospitalizationCommitteeContext[1]
  }
};