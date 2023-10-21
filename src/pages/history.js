import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Ctx } from "../context/store";
import { Card, Button } from "react-bootstrap";

const History = () => {
    const { darkMode, searchHistory, setSearchTerm, setSearchHistory } = useContext(Ctx);
    const navigate = useNavigate();

    const handleSearchAgain = (searchQuery) => {
        setSearchTerm(searchQuery);
        navigate("/");
    }

    const handleDeleteFromHistory = (searchQuery) => {
        const newArray = searchHistory.filter(obj => obj.q !== searchQuery)
        setSearchHistory(newArray);
        localStorage.setItem("searchHistory", JSON.stringify(newArray))
    }

    return (
        <main className={`${darkMode && "dark-mode"}`}>
            <div>
            {searchHistory.map((historyItem) => (
                <Card
                    style={{ width: '18rem', margin: "1rem" }}
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