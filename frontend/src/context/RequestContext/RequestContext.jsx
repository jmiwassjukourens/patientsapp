
import { createContext, useContext, useState } from "react";

const RequestContext = createContext();
export const useRequest = () => useContext(RequestContext);

let updateCount; 

export const requestManager = {
  increment: () => updateCount?.((prev) => prev + 1),
  decrement: () => updateCount?.((prev) => Math.max(prev - 1, 0)),
};

export function RequestProvider({ children }) {
  const [activeRequests, setActiveRequests] = useState(0);
  updateCount = setActiveRequests;

  return (
    <RequestContext.Provider value={{ activeRequests }}>
      {children}
    </RequestContext.Provider>
  );
}
