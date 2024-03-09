import { createContext, useState } from "react";
import { auth, signOut } from "../firebase/fb";

export const Ctx = createContext();


const Provider = ({ children }) => {

    const storedTheme = localStorage.getItem("darkMode");
    const storedDarkMode = Boolean(storedTheme);

    const storedSearchHistoryStr = localStorage.getItem("searchHistory");
    const storedSearchHistory = storedSearchHistoryStr ? JSON.parse(storedSearchHistoryStr) : [];

    const storedFavoritesStr = localStorage.getItem("favorites");
    const storedFavorites = storedFavoritesStr ? JSON.parse(storedFavoritesStr) : [];


    const [darkMode, setDarkMode] = useState(storedDarkMode);
    const [data, setData] = useState();
    const [searchHistory, setSearchHistory] = useState(storedSearchHistory);
    const [searchTerm, setSearchTerm] = useState();
    const [favorites, setFavorites] = useState(storedFavorites);
    const [modalData, setModalData] = useState({
        show: false,
        title: "",
        children: null,
        form: null,
        data: null
    });

    //TODO setUser also in sassionStorage
    const [user, setUser] = useState();
  
    const handleSignout = () => {
        signOut(auth)
        .then((res) => {
            setUser(null)
        })
    }

    return <Ctx.Provider 
    value={{
        darkMode, 
        setDarkMode, 
        data,
        setData,
        searchHistory, 
        setSearchHistory,
        searchTerm,
        setSearchTerm,
        modalData, 
        setModalData,
        favorites, 
        setFavorites, 
        user,
        setUser,
        handleSignout
    }}>{children}</Ctx.Provider>
}

export default Provider;