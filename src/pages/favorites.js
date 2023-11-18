import { useContext, useState, useEffect } from "react";
import { Ctx } from "../context/store";
import { FcFolder, FcDownLeft } from "react-icons/fc";

const FavoritesPage = () => {
    const [foldersList, setFoldersList] = useState([]);
    const [bradCrump, setBradCrump] = useState([]);
    const { darkMode, favorites } = useContext(Ctx);

    useEffect(() => {
        setFoldersList(favorites);
        //setBradCrump(["home"]);
    }, [])

    const handleEnterCategory = (e, name) => {
        e.preventDefault();
        const foundCategoryObj = foldersList.find(fav => fav.name === name);
        if (foundCategoryObj?.folders) setFoldersList(foundCategoryObj.folders);
        else {
            setFoldersList(foundCategoryObj.mediaItems);
        }

        setBradCrump(state => {
            if (!state.includes(name)) state.push(name);
            return state;
        });
    }

    const handleBradCrumpNav = () => {
        let foundCategoryObj = favorites;
        const list = [...bradCrump];
        list.pop();
        setBradCrump(list);
        if (list.length === 0) setFoldersList(favorites);
        list.forEach(name => {
            const foundObj = foundCategoryObj.find(fav => fav.name === name);
            if (foundObj?.folders) {
                setFoldersList(foundObj.folders);
                foundCategoryObj = foundObj.folders
            }
            else {
                setFoldersList(foundObj.mediaItems);
                foundCategoryObj = foundObj.mediaItems
            }
        });
    }

    return (
        <main className={`${darkMode && "dark-mode"}`}>
            <div className="ms-5 mr-auto mt-3" onClick={handleBradCrumpNav} style={{ cursor: "pointer", height: "2rem" }}>
                {bradCrump.length > 0 && <><FcDownLeft size="2rem"></FcDownLeft><span className="ms-1">Back</span></>}
            </div>
            <div className="ms-5 mt-3 d-flex gap-3" style={{color: "#3f51b5"}}>
                {bradCrump.map((bradCrumpItem, index) => (
                    <>
                        <span>{bradCrumpItem}</span>
                        {index < bradCrump.length-1 && <span>{` / `}</span>}
                    </>
                ))}
            </div>
            <hr />
            <div className="d-flex m-5 mt-1 gap-5">
                {foldersList.map(folder => {
                    return folder.id ?
                        <div key={folder?.id?.videoId}>
                            <iframe
                                //style={{visibility: iframeOnLoad ? "visible" : "hidden"}}
                                //onLoad={() => setIframeOnLoad(true)}
                                width="320"
                                height="180"
                                src={`https://www.youtube.com/embed/${folder?.id?.videoId}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen></iframe>
                        </div>
                        :
                        <div key={folder.name} className="text-center" style={{ cursor: "pointer" }} onDoubleClick={(e) => handleEnterCategory(e, folder.name)}>
                            <FcFolder size="4rem" />
                            <p className="m-0">{folder.name}</p>
                        </div>
                })}
            </div>
        </main>
    )
}

export default FavoritesPage;