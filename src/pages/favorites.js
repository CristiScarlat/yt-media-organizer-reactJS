import { useContext, useState, useEffect, Fragment } from "react";
import { Ctx } from "../context/store";
import { FcFolder, FcDownLeft } from "react-icons/fc";
import PreviewCard from "../components/previewCard/previewCard";
import _ from "lodash";


//TODO open folders by onTouch event also for mobile
const FavoritesPage = () => {
    const [foldersList, setFoldersList] = useState([]);
    const [bradCrump, setBradCrump] = useState([]);
    const { darkMode, favorites, setFavorites } = useContext(Ctx);

    useEffect(() => {
        setFoldersList(favorites);
        //setBradCrump(["home"]);
    }, [])

    const handleEnterCategory = (e, name) => {
        //e.preventDefault();
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

    const handleOnClickRight = (e) => {
        //e.preventDefault();
        if(e.type === "contextmenu"){
            console.log("click dreapta", e)
        }

    }

    const handleDeleteFavorite = (data) => {
        const clonedFavorites = _.cloneDeep(favorites);
        let recursiveArray = clonedFavorites;
        bradCrump.forEach(key => {
            const found = recursiveArray.find(obj => obj.name === key);
            if(found?.folders)recursiveArray = found.folders;
            else if(found.mediaItems)recursiveArray = found.mediaItems;
        })
        const indexToDelete = recursiveArray.findIndex(mediaItem => mediaItem.id.videoId === data.id.videoId);
        recursiveArray.splice(indexToDelete, 1);
        setFoldersList(recursiveArray)
        setFavorites(clonedFavorites);
        localStorage.setItem("favorites", JSON.stringify(clonedFavorites));
    }

    return (
        <main className={`${darkMode && "dark-mode"} mt-lg-5`}>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    {bradCrump.length === 0 ? <h5 className="text-white ms-5 mr-auto mt-3">Favorites</h5> : <>
                        <div className="ms-5 mr-auto mt-3" onClick={handleBradCrumpNav} style={{ cursor: "pointer", height: "2rem" }}>
                            {bradCrump.length > 0 && <><FcDownLeft size="2rem"></FcDownLeft><span className="ms-1">Back</span></>}
                        </div>
                        <div className="ms-5 mt-3 d-flex gap-3" style={{ color: "#3f51b5" }}>
                            {bradCrump.map((bradCrumpItem, index) => (
                                <Fragment key={index}>
                                    <span>{bradCrumpItem}</span>
                                    {index < bradCrump.length - 1 && <span>{` / `}</span>}
                                </Fragment>
                            ))}
                        </div>
                    </>}
                </div>
                <div className="me-5">
                    {/* <button>Select</button> */}
                </div>
            </div>
            <hr className="m-1"/>
            <div className="d-flex flex-wrap m-5 mt-1 gap-5">
                {foldersList.map(folder => {
                    return folder.id ?
                        <PreviewCard
                            key={folder.id.videoId}
                            data={folder}
                            className="mx-auto my-3"
                            theme={darkMode}
                            showHeartButton={false}
                            showDeleteButton={true}
                            onDeleteClick={handleDeleteFavorite}
                        />
                        :
                        <div key={folder.name}
                            className="text-center"
                            style={{ cursor: "pointer" }}
                            onDoubleClick={(e) => handleEnterCategory(e, folder.name)}
                            onTouchStart={(e) => handleEnterCategory(e, folder.name)}
                            onContextMenu={(e) => handleOnClickRight(e, folder.name)}>
                            <FcFolder size="4rem" />
                            <p className="m-0">{folder.name}</p>
                        </div>
                })}
            </div>
            {/* <div>
                <button>Rename</button>
                <button>Delete</button>
            </div> */}
        </main>
    )
}

export default FavoritesPage;