import { useContext, useState, useEffect } from "react";
import { Ctx } from "../context/store";
import { FcFolder, FcDownLeft } from "react-icons/fc";

const FavoritesPage = () => {
    const [foldersList, setFoldersList] = useState([]);
    const [bradCrump, setBradCrump] = useState("home");
    const { darkMode, favorites } = useContext(Ctx);

    useEffect(() => {
        setFoldersList(favorites);
    }, [])

    const handleEnterCategory = (e, category) => {
        e.preventDefault();
        const foundCategoryObj = favorites.find(fav => fav.name === category)
        setFoldersList(foundCategoryObj.folders);
        setBradCrump(category);
    }

    const handleBradCrumpNav = () => {
        setFoldersList(favorites);
        setBradCrump("home")
    }

    return (
        <main className={`${darkMode && "dark-mode"}`}>
            <div className="ms-5 mr-auto mt-3" onClick={handleBradCrumpNav} style={{cursor: "pointer", height: "2rem"}}>
                {bradCrump !== "home" && <><FcDownLeft size="2rem"></FcDownLeft><span className="ms-1">Back</span></>}
            </div>
            <hr/>
            <div className="d-flex m-5 mt-1 gap-5">
                {foldersList.map(folder => (
                    <div key={folder.name} className="text-center" style={{cursor: "pointer"}} onDoubleClick={(e) => handleEnterCategory(e, folder.name)}>
                        <FcFolder size="4rem"/>
                        <p className="m-0">{folder.name}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default FavoritesPage;