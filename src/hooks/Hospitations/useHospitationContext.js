import { useContext } from "react";
import { HospitationContext } from "../../providers/hospitationProvider";

export const useHospitationContext = () => {
  const hospitationContext = useContext(HospitationContext);
  return {
      state1: hospitationContext[0],
      dispatch: hospitationContext[1]
  }
};