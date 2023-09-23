import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { Ctx } from '../../context/store';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { GoSun, GoMoon } from 'react-icons/go';



const Header = () => {
    const { setDarkMode, darkMode, setSearchTerm, setSearchHistory, searchHistory } = useContext(Ctx);
    const expand = 'lg'

    const handleDarkMode = () => {
        setDarkMode(state => {
            localStorage.setItem("darkMode", JSON.stringify(!state));
            return !state
        });
    }

    const handleSearchTerm = (e) => {
        e.preventDefault();
        if(e.target[0].value && e.target[0].value !== ""){
            setSearchTerm(e.target[0].value);
            if(!searchHistory.find(item => item.q === e.target[0].value)){
                const historyObj = {
                    date: new Date().toString(),
                    q: e.target[0].value
                }
                setSearchHistory((state) => {
                    localStorage.setItem("searchHistory", JSON.stringify([...state, historyObj]));
                    return [...state, historyObj]
                })
            }
        }
    }

    console.log(searchHistory)
    return (
        <>
            <Navbar expand={expand} bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} fixed='top'>
                <Container fluid>
                    <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Offcanvas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Link to="/" className="nav-link">Home</Link>
                                <Link to="/history" className="nav-link">History</Link>
                            </Nav>
                            <Form className="d-flex" onSubmit={handleSearchTerm}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success" type="submit">Search</Button>
                                <div className="ms-3 me-3 d-flex align-items-center" style={{cursor: "pointer"}}>
                                    {darkMode ? <GoSun size="1.2rem" onClick={handleDarkMode} color="white"/> : <GoMoon size="1.2rem" onClick={handleDarkMode}/>}
                                </div>
                            </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;