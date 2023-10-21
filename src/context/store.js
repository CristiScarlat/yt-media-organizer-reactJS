import { createContext, useState } from "react";

export const Ctx = createContext();


const Provider = ({ children }) => {

    const storedTheme = localStorage.getItem("darkMode");
    const storedDarkMode = Boolean(storedTheme);

    const storedSearchHistoryStr = localStorage.getItem("searchHistory");
    const storedSearchHistory = storedSearchHistoryStr ? JSON.parse(storedSearchHistoryStr) : [];

    const [darkMode, setDarkMode] = useState(storedDarkMode);
    const [searchTerm, setSearchTerm] = useState(false);
    const [searchHistory, setSearchHistory] = useState(storedSearchHistory);
    const [favorites, setFavorites] = useState([
        {
            name: "Music",
            fodlers: [
                {
                    name: "Rock",
                    mediaItems: []
                },
                {
                    name: "Jazz",
                    mediaItems: []
                }
            ]
        }
    ]);
    const [modalData, setModalData] = useState({
        show: false,
        title: "",
        children: null
    });

    return <Ctx.Provider 
    value={{
        darkMode, 
        setDarkMode, 
        searchTerm, 
        setSearchTerm, 
        searchHistory, 
        setSearchHistory,
        modalData, 
        setModalData,
        favorites, 
        setFavorites
    }}>{children}</Ctx.Provider>
}

export default Provider;