import { useContext } from "react";
import { AcademicContext } from "../../providers/academicProvider";
import { HospitalizationCommitteeContext } from "../../providers/hospitalizationCommitteeProvider";
import { ProtocolContext } from "../../providers/protocolProvider";

export const useAcademicContext = () => {
  const academicContext = useContext(AcademicContext);
  return {
      stateee: academicContext[0],
      dispatch: academicContext[1]
  }
};