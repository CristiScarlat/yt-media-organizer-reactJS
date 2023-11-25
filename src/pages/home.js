import { useContext, useEffect, useState } from "react";
import { Ctx } from "../context/store";
import { ytSearch } from "../services/yt";
import PreviewCard from "../components/previewCard/previewCard";
import PageNavigator from "../components/pageNavigator/pageNavigator";


const Home = () => {

    const { darkMode, searchTerm, setModalData, data, setData } = useContext(Ctx);


    const searchYoutube = (query, pageToken) => {
        ytSearch(query, pageToken)
            .then(res => {
                if (res.status === 200) {
                    setData(res.data);
                    window.scrollTo(0, 0);
                }
            })
            .catch(error => console.log(error.data.error))
    }

    const handleNextPage = () => {
        if (data.nextPageToken) {
            searchYoutube(searchTerm, data.nextPageToken)
        }
    }

    const handlePrevPage = () => {
        if (data.prevPageToken) {
            searchYoutube(searchTerm, data.prevPageToken)
        }
    }

    const handleOpenModal = (obj) => {
        setModalData({
            show: true,
            title: obj?.snippet?.title || "",
            form: true,
            data: obj
        })
    }

    return (
        <main className={`${darkMode && "dark-mode"}`}>
            {data?.items && data.items.map(item => (
                <PreviewCard
                    key={item.id.videoId}
                    data={item}
                    className="mx-auto my-3"
                    theme={darkMode}
                    onHeartClick={() => handleOpenModal(item)} />
            ))}
            {data?.items?.length > 0 ?
                <PageNavigator
                    className="mx-auto my-3 gap-2"
                    style={{ width: "fit-content" }}
                    nextOnClick={handleNextPage}
                    prevOnClick={handlePrevPage}
                    nextButtonDisabled={!data.nextPageToken}
                    prevButtonDisabled={!data.prevPageToken}
                /> : <p className={`${darkMode ? "text-white" : ""} h3 text-center m-5`}>You have to search for something!</p>}
        </main>
    )
}

export default Home;