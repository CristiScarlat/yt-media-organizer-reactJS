import { Pagination } from "react-bootstrap"


const PageNavigator = ({className, style, prevButtonDisabled, nextButtonDisabled, nextOnClick, prevOnClick}) => {
    return(
    <Pagination className={className} style={style}>
        <Pagination.Prev onClick={prevOnClick} disabled={prevButtonDisabled}>Prev Page</Pagination.Prev>
        <Pagination.Next onClick={nextOnClick} disabled={nextButtonDisabled}>Next Page</Pagination.Next>
    </Pagination>
    )
}

export default PageNavigator;