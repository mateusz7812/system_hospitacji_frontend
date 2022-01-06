import Protocol from "../Protocol";
export const useProtocolsList = () => {
    const protocolsItems = [new Protocol(0, "nieustalona", "Hospitowany", "Analiza matematyczna", "Adam Kowalski", "Utworzony"),
                            new Protocol(1, "2021-12-10 15:15", "Hospitujący", "Analiza matematyczna", "Adam Kowalski", "Wystawiony"),
                            new Protocol(2, "2022-01-10 15:15", "Hospitowany", "Analiza matematyczna", "Adam Kowalski", "Edytowany")]
    return {
        protocolsItems
    };
}