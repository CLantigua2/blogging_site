import { createContext } from "react";

const RedirectContext = createContext({
  redirect: "",
  setRedirect: () => {},
});

export default RedirectContext;
