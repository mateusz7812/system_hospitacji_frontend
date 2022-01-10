import { useContext } from "react";
import { ProtocolContext } from "../../providers/protocolProvider";

export const useProtocolContext = () => {
  const protocolContext = useContext(ProtocolContext);
  return {
      state: protocolContext[0],
      dispatch: protocolContext[1]
  }
};