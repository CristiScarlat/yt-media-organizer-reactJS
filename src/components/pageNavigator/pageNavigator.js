import { Pagination } from "react-bootstrap"


const PageNavigator = ({className, style, nextOnClick, prevOnClick}) => {
    return(
    <Pagination className={className} style={style}>
        <Pagination.Prev onClick={prevOnClick}>Prev Page</Pagination.Prev>
        <Pagination.Next onClick={nextOnClick}>Next Page</Pagination.Next>
    </Pagination>
    )
}

export default PageNavigator;