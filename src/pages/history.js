import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Ctx } from "../context/store";
import { Card, Button } from "react-bootstrap";
import { ytSearch } from "../services/yt";

const History = () => {
    const { darkMode, searchHistory, setData, setSearchHistory } = useContext(Ctx);
    const navigate = useNavigate();

    const handleSearchAgain = (searchQuery) => {
        ytSearch(searchQuery)
            .then(res => {
                if (res.status === 200) {
                    setData(res.data);
                }
            })
            .catch(error => console.log(error.data.error))
        navigate("/");
    }

    const handleDeleteFromHistory = (searchQuery) => {
        const newArray = searchHistory.filter(obj => obj.q !== searchQuery)
        setSearchHistory(newArray);
        localStorage.setItem("searchHistory", JSON.stringify(newArray))
    }

    const reverseArray = (list) => {
        const reversedList = []
        const length = list.length;
        for(let i=length-1; i>0; i--){
            reversedList.push(list[i]);
        }
        return reversedList;
    }

    return (
        <main className={`${darkMode && "dark-mode"}`}>
            <div>
            {reverseArray(searchHistory).map((historyItem) => (
                <Card
                    key={historyItem.date}
                    style={{ margin: "1rem" }}
                    bg={darkMode ? "dark" : "light"}
                    text={darkMode ? "white" : "dark"}
                >
                    <Card.Body>
                        <Card.Title style={{textTransform: "capitalize"}}>{historyItem.q}</Card.Title>
                        <Card.Text>
                            {historyItem.date}
                        </Card.Text>
                        <div className="d-flex justify-content-end gap-2">
                            <Button onClick={() => handleSearchAgain(historyItem.q)}>Search again</Button>
                            <Button variant="danger" onClick={() => handleDeleteFromHistory(historyItem.q)}>Delete</Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}
            </div>
        </main>
    )
}

export default History;