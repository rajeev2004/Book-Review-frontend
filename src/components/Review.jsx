import React from "react";
function Review(props) {
  const formatDate = new Date(props.created_at).toLocaleString();
  return (
    <div className="reviewContainer">
      <p>Username: {props.username}</p>
      <p>Review: {props.review}</p>
      <p>Rating: {props.rating} ⭐</p>
      <p>Posted at: {formatDate} (UTC)</p>
    </div>
  );
}
export default Review;
