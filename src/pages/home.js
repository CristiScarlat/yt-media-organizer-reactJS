import { useContext, useEffect } from "react";
import { Ctx } from "../context/store";
import { ytSearch } from "../services/yt";

const Home = () => {
    const { darkMode, searchTerm } = useContext(Ctx);

    useEffect(() => {
        if(searchTerm && searchTerm !== ""){
            ytSearch(searchTerm)
            .then(res => console.log(res))
            .catch(error => console.log(error))
        }
    }, [searchTerm])

    return(
    <main className={`${darkMode && "dark-mode"}`}>
        Home
    </main>
    )
}

export default Home;