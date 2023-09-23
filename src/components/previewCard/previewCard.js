import { Col, Row, Spinner } from "react-bootstrap";
import "./previewCard.css";
import { useState } from "react";


const PreviewCard = ({ data, className }) => {
    const [iframeOnLoad, setIframeOnLoad] = useState(false);

    return (
        <div className={`${className} preview-card-wrapper`}>
            <Row>
                <Col xs={12} lg={6}>
                    <div style={{position: "relative", width: "fit-content"}}>
                        <iframe
                            style={{visibility: iframeOnLoad ? "visible" : "hidden"}}
                            onLoad={() => setIframeOnLoad(true)}
                            width="320"
                            height="180"
                            src={`https://www.youtube.com/embed/${data?.id?.videoId}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen></iframe>
                        <Spinner variant="light" style={{visibility: !iframeOnLoad ? "visible" : "hidden", position: "absolute", top: '50%', left: '50%'}}/>
                    </div>
                </Col>
                <Col xs={12} lg={6}>
                    <h3>{data?.snippet?.title}</h3>
                    <p>{data?.snippet?.description}</p>
                </Col>
            </Row>
        </div>
    )
}

export default PreviewCard;