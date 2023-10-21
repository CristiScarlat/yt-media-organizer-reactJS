import { useContext, useEffect, useState } from "react";
import { Ctx } from "../context/store";
import { ytSearch } from "../services/yt";
import PreviewCard from "../components/previewCard/previewCard";
import PageNavigator from "../components/pageNavigator/pageNavigator";


const Home = () => {
    const [data, setData] = useState();
    const { darkMode, searchTerm, setModalData } = useContext(Ctx);

    useEffect(() => {
        if (searchTerm && searchTerm !== "") {
            searchYoutube(searchTerm)
        }
    }, [searchTerm])

    const searchYoutube = (query, pageToken) => {
        ytSearch(query, pageToken)
            .then(res => {
                if (res.status === 200) {
                    setData(res.data);
                    window.scrollTo(0, 0);
                }
            })
            .catch(error => console.log(error))
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
            {data?.items?.length > 0 &&
                <PageNavigator
                    className="mx-auto my-3 gap-2"
                    style={{ width: "fit-content" }}
                    nextOnClick={handleNextPage}
                    prevOnClick={handlePrevPage}
                />}

        </main>
    )
}

export default Home;