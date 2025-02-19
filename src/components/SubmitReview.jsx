import React,{useState} from "react";
import {useLocation,useNavigate} from "react-router-dom";
import axios from "axios";
function SubmitReview(){
    const backend='https://book-review-backend-1tje.onrender.com'
    const navigate=useNavigate();
    const location=useLocation();
    const [error,setError]=useState('');
    const [rating,setRating]=useState(0);
    const [review,setReview]=useState('');
    function handleRatingChange(e){
        setRating(e.target.value);
    }
    function handleReviewChange(e){
        setReview(e.target.value);
    }
    async function formSubmitted(e){
        e.preventDefault();
        try{
            const result=await axios.post(`${backend}/reviews?book_id=${location.state.bookId}`,{rating,review,user_id:localStorage.getItem('user_id')});
            if(result.data.message==='review posted'){
                alert('Review Posted.')
                setRating(0);
                setReview('');
            }
        }catch(err){
            setError(err.response?.data?.error||err.message||'Try again, something went wrong');
        }
    }
    return(
        <div className="submitReviewContainer">
            {error && <p className="message">{error}</p>}
            <form className="form" onSubmit={formSubmitted}>
                <h3>Rate and review this book...</h3>
                <div className="rating">
                    <label>Rate this book:</label>
                    {[1,2,3,4,5].map(value=>(
                        <label key={value}>
                            <input type="radio"
                            name="rating"
                            value={value}
                            checked={rating==value}
                            onChange={handleRatingChange}
                            />
                            {value}
                        </label>
                    ))}
                </div>
                <div className="review">
                    <label>Write a review:</label>
                    <textarea
                    placeholder="Write a review..."
                    value={review}
                    rows='4'
                    cols='40'
                    onChange={handleReviewChange}
                    />
                </div>
                <button type="submit" disabled={rating===0 || review.trim()===''}>Submit Review</button>
                <button type="button" onClick={()=>navigate('/homepage')}>Go To DashBoard</button>
            </form>
        </div>
    )
}
export default SubmitReview;