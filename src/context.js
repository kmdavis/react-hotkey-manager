import { createContext } from "react";

export default createContext({
    bindings: [],
    bind (binding) {},
    unbind (binding) {},
});
