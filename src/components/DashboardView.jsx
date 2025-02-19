import React from "react";
function DashboardView(props){
    return(
        <div className="bookDashboardContainer">
            <div className="bookDashboardContainerDetail">
                <h3><strong>Title: </strong>{props.title}</h3>
                <p><strong>Author: </strong>{props.author}</p>
                <p><strong>Publish Year: </strong>{props.publishedYear}</p>
                <p><strong>Rating: </strong>{props.rating} ⭐</p>
            </div>
            <div className="bookDashboardContainerButton">
                <button type="button" onClick={()=>props.seeMore(props.id)}>More Details</button>
                <button type="button" onClick={()=>props.submitReview(props.id)}>Submit a Review</button>
                <button type="button" onClick={()=>props.seeReviews(props.id)}>Reviews</button>
            </div>
        </div>
    )
}
export default DashboardView;