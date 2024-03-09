import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Ctx } from '../../context/store';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { GoSun, GoMoon } from 'react-icons/go';
import { ytSearch } from "../../services/yt";



const Header = () => {
    const [offcanvasState, setOffcanvasState] = useState(false);
    const { setDarkMode, darkMode, setData, setSearchHistory, searchHistory, setSearchTerm, user, handleSignout} = useContext(Ctx);
    const expand = 'lg'

    const location = useLocation();
    const navigate = useNavigate();

    const handleDarkMode = () => {
        setDarkMode(state => {
            localStorage.setItem("darkMode", JSON.stringify(!state));
            return !state
        });
    }

    const handleSearchTerm = (e) => {
        e.preventDefault();
        if (e.target[0].value && e.target[0].value !== "") {
            ytSearch(e.target[0].value)
                .then(res => {
                    if (res.status === 200) {
                        setData(res.data);
                        setSearchTerm(e.target[0].value);
                    }
                })
                .catch(error => console.log(error.data.error))
            if (!searchHistory.find(item => item.q === e.target[0].value)) {
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
        if (location.pathname === "/") return;
        navigate("/");
    }

    const handleCloseOffcanvas = () => {
        setOffcanvasState(false);
    }

    const redirectToLogin = () => {
        navigate("/login");
    }

    console.log("este user", user)

    return (
        <>
            <Navbar
                expand={expand}
                bg={darkMode ? "dark" : "light"}
                variant={darkMode ? "dark" : "light"}
                fixed='top'
                className="flex-nowrap"
                expanded={offcanvasState}
                onToggle={() => setOffcanvasState(state => !state)}
                >
                <Container fluid>
                    <Navbar.Brand className="overflow-hidden">Youtube Media Organizer</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="start"
                        className={darkMode ? "offcanvas-dark" : "offcanvas-light"}
                        
                    >
                        <Offcanvas.Header closeButton closeVariant={darkMode ? "white" : ""}>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>

                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3" onChange={() => console.log("on select")}>
                                <Link to="/" className={`${location.pathname === "/" ? "nav-link-current" : ""} nav-link`} onClick={handleCloseOffcanvas}>Home</Link>
                                {user && <Link to="/history" className={`${location.pathname === "/history" ? "nav-link-current" : ""} nav-link`} onClick={handleCloseOffcanvas}>History</Link>}
                                {user && <Link to="/favorites" className={`${location.pathname === "/favorites" ? "nav-link-current" : ""} nav-link`} onClick={handleCloseOffcanvas}>Favorites</Link>}
                            </Nav>
                            <Form className="d-lg-flex d-none" onSubmit={handleSearchTerm} name="search">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success" type="submit">Search</Button>
                            </Form>
                            <hr />
                            <div className="ms-0 me-3 d-flex align-items-center" style={{ cursor: "pointer" }}>
                                {darkMode ? <button className="button-no-style ms-lg-3 p-0" onClick={handleDarkMode}><span className="me-2 d-lg-none">Dark Mode</span><GoSun size="1.2rem" color="white" /></button>
                                    :
                                    <button className="button-no-style ms-lg-3 p-0" onClick={handleDarkMode} ><span className="me-2 d-lg-none">Light Mode</span><GoMoon size="1.2rem" /></button>}
                            </div>
                            <div className="ms-0 me-3 d-flex align-items-center" style={{ cursor: "pointer" }}>
                                {user ? <button className="button-no-style ms-lg-3 p-0" onClick={handleSignout}>Sign out</button>
                                    :
                                    <button className="button-no-style ms-lg-3 p-0" onClick={redirectToLogin}>Login</button>}
                            </div>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <div className={darkMode ? "dark-mode d-lg-none" : "d-lg-none"}>
                <Form className="d-flex mx-auto mt-5 pt-3 px-3 gap-2" onSubmit={handleSearchTerm} name="search">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <Button variant="outline-success" type="submit">Search</Button>
                </Form>
            </div>
        </>
    )
}

export default Header;