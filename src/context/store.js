import { createContext, useState } from "react";

export const Ctx = createContext();


const Provider = ({ children }) => {

    const storedTheme = localStorage.getItem("darkMode");
    const storedDarkMode = Boolean(storedTheme);

    const [darkMode, setDarkMode] = useState(storedDarkMode);
    const [searchTerm, setSearchTerm] = useState(false);

    return <Ctx.Provider value={{darkMode, setDarkMode, searchTerm, setSearchTerm}}>{children}</Ctx.Provider>
}

export default Provider;