import { useContext, useState } from "react";
import { Ctx } from "../../context/store";
import { Modal as BsModal, Button } from "react-bootstrap";
import { Form, InputGroup } from "react-bootstrap";

const Modal = () => {
    const [selectedCategory, setSelectedCategory] = useState();
    const { modalData: { show, title, children, form }, setModalData, favorites, setFavorites } = useContext(Ctx);

    const handleSelectCategory = (e) => {
        setSelectedCategory(e.target.value)
    }

    return (
        <BsModal
            size="lg"
            centered
            show={show}
            onHide={() => {
                const newData = { title, children, show: false }
                setModalData(newData);
                //setSelectedCategory(null);
            }}
        >
            <BsModal.Header closeButton>
                <BsModal.Title>
                    {title}
                </BsModal.Title>
            </BsModal.Header>
            <BsModal.Body>
                {form ? <div>
                    <Form.Group className="mb-3">
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="New Category"
                                aria-label="New Category"
                                aria-describedby="new-category"
                            />
                            <Button variant="outline-secondary" id="new-category">
                                Add Category
                            </Button>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Category</Form.Label>
                        <Form.Select defaultValue={0} onChange={handleSelectCategory}>
                            <option value={0} disabled>Select Category</option>
                            {favorites.map(category => <option key={category.name} value={category.name}>{category.name}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="New Folder"
                                aria-label="New Folder"
                                aria-describedby="new-folder"
                                disabled={!selectedCategory}
                            />
                            <Button variant="outline-secondary" id="new-folder">
                                Add Folder
                            </Button>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Folder</Form.Label>
                        <Form.Select disabled={!selectedCategory}>
                            <option>Folder-1</option>
                            <option>Folder-2</option>
                        </Form.Select>
                    </Form.Group>
                    {/* <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Can't check this" disabled />
                </Form.Group> */}
                </div> : children}
            </BsModal.Body>
            <BsModal.Footer>
                <Button>Close</Button>
            </BsModal.Footer>
        </BsModal>
    )
}

export default Modal;