import { useContext, useState } from "react";
import { Ctx } from "../context/store";
import { ytSearch } from "../services/yt";
import PreviewCard from "../components/previewCard/previewCard";
import PageNavigator from "../components/pageNavigator/pageNavigator";
import { download } from "../services/downloader";
import FileSaver from 'file-saver';


const Home = () => {

    const [downloading, setDownloading] = useState(null);
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

    const handleDownloadVideo = async (videoUrl) => {
        try {
          const videoRequest = new Request(videoUrl);
          fetch(videoRequest)
            .then(() => {
              const link = document.createElement('a');
              link.href = videoUrl;
              //link.setAttribute('download', 'waterfall.mp4');
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            });
        } catch (error) {
          console.error(error);
        }
      };

    const handleDownload = async (data) => {
        try{
            setDownloading(data?.id?.videoId)
            const videoId = data?.id?.videoId;
            console.log("start")
            const res = await download(videoId);
            
            const filename = res.request.getResponseHeader('Content-Disposition')?.split("=")[1]?.replaceAll('"', "") || "download.mp4";
            const blob = new Blob([res.data],{
                type: 'application/octet-stream'
            });
            FileSaver.saveAs(blob, filename);
            setDownloading(null);
        }
        catch(error){
            console.log(error);
            setDownloading(null);
        } 
    }

    //TODO add empty heart for items not add yet to favorites
    //TODO investigate download not working on mobile - it is now working
    //TODO investigate touch and longtouch for file navigation on mobile

    return (
        <main className={`${darkMode && "dark-mode"} mt-lg-5`}>
            {data?.items && data.items.map(item => (
                <PreviewCard
                    key={item.id.videoId}
                    data={item}
                    className="mx-lg-auto my-3"
                    theme={darkMode}
                    onHeartClick={() => handleOpenModal(item)} 
                    showDownloadButton={true}
                    onDownloadClick={handleDownload}
                    downloading={downloading}/>
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