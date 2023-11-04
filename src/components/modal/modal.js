import { useContext, useState, useRef, useEffect } from "react";
import { Ctx } from "../../context/store";
import { Modal as BsModal, Button } from "react-bootstrap";
import { Form, InputGroup } from "react-bootstrap";
import _ from "lodash";

const Modal = () => {
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedFolder, setSelectedFolder] = useState();
    const { modalData: { show, title, children, form, data }, setModalData, favorites, setFavorites } = useContext(Ctx);

    const categoryName = useRef();
    const folderName = useRef();

    const handleAddCategory = () => {
        const value = categoryName.current.value;
        if (value && value !== "") {
            const cat = {
                name: value,
                folders: []
            }
            setFavorites([...favorites, cat])
        }
    }


    const handleSelectCategory = (e) => {
        setSelectedCategory(e.target.value)
    }

    const handleSelectFolder = (e) => {
        setSelectedFolder(e.target.value)
    }

    const handleAddFolder = () => {
        const value = folderName.current.value;
        if (value && value !== "") {
            const clonedFavorites = _.cloneDeep(favorites);
            const foundCategory = clonedFavorites.find(fav => fav.name === selectedCategory);
            foundCategory.folders.push({
                name: value,
                mediaItems: []
            })
            setFavorites(clonedFavorites);
        }
    }

    const renderFoldersList = () => {
        if(selectedCategory){
            const foundCategory = favorites.find(fav => fav.name === selectedCategory);
            return foundCategory.folders.map(folder => <option value={folder.name}>{folder.name}</option>)
        }
        return null;
    }

    const handleSave = () => {
        const clonedFavorites = _.cloneDeep(favorites);
        const foundCategory = clonedFavorites.find(fav => fav.name === selectedCategory);
        const foundFolder = foundCategory.folders.find(folder => folder.name === selectedFolder);
        const foundMediaItem = foundFolder.mediaItems.find(mediaItem => mediaItem.id.videoId === data.id.videoId);
        if(!foundMediaItem){
            foundFolder.mediaItems.push(data);
            setFavorites(clonedFavorites);
            localStorage.setItem("favorites", JSON.stringify(clonedFavorites));
            setModalData({
                show: false
            })
            return
        }
        setModalData({
            show: false
        })
        alert("Item already added in favorites!");
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
                                ref={categoryName}
                            />
                            <Button variant="outline-secondary" id="new-category" onClick={handleAddCategory}>
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
                                ref={folderName}
                            />
                            <Button variant="outline-secondary" id="new-folder" onClick={handleAddFolder}>
                                Add Folder
                            </Button>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Folder</Form.Label>
                        <Form.Select disabled={!selectedCategory} defaultValue={0}  onChange={handleSelectFolder}>
                            <option value={0} disabled>Select Folder</option>
                            {renderFoldersList()}
                        </Form.Select>
                    </Form.Group>
                    {/* <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Can't check this" disabled />
                </Form.Group> */}
                </div> : children}
            </BsModal.Body>
            <BsModal.Footer>
                <Button onClick={handleSave}>Save</Button>
            </BsModal.Footer>
        </BsModal>
    )
}

export default Modal;