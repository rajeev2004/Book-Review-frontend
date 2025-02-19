import React,{useState,useEffect} from "react";
import {useLocation,useNavigate} from "react-router-dom";
import axios from "axios";
import Review from "./Review";
function Reviews(){
    const backend='https://book-review-backend-1tje.onrender.com';
    const navigate=useNavigate();
    const location=useLocation();
    const [page,setPage]=useState(1);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState('');
    const [hasMore,setHasMore]=useState(true);
    const [reviews,setReviews]=useState([]);
    useEffect(()=>{
        setLoading(true);
        async function getReviews(){
            try{
                const result=await axios.get(`${backend}/reviews/${location.state.bookId}?page=${page}`);
                setLoading(false);
                setReviews(result.data.reviews);
                setHasMore(result.data.hasMore);
            }catch(err){
                setLoading(false);
                console.error(err);
                setError(err.response?.data?.error||err.message||'Could not fetch the reviews');
            }
        }
        getReviews();
    },[page]);
    if(loading){
        return<div>Loading...</div>
    }
    return(
        <div className="reviewsContainer">
            <div className="reviewHeader">
                <div>
                    <h2>Reviews...</h2>
                </div>
                <div style={{marginLeft:"auto"}}>
                    <button type="button" onClick={()=>navigate('/homepage')}>Go To DashBoard</button>
                </div>
            </div>
            {error && <p className="message">{error}</p>}
                {reviews.length===0?(<p style={{textAlign:"center"}}>No reviews yet...</p>):(
                    <div  className="allReviews">
                        {reviews.map((review,index)=>(
                            <Review
                            key={index}
                            username={review.username}
                            review={review.review}
                            rating={review.rating}
                            created_at={review.created_at}
                            />
                        ))}
                    </div>
                )}
            <div className="paginationButton">
                <button type="button" className="special-button" onClick={()=>setPage(page-1)} disabled={page===1}>Previous</button>
                <button type="button" className="special-button" onClick={()=>setPage(page+1)} disabled={!hasMore}>Next</button>
            </div>
        </div>
    )
}
export default Reviews;