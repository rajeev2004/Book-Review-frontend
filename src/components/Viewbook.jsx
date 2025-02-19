import React,{useState,useEffect} from "react";
import {useLocation,useNavigate} from "react-router-dom";
import axios from "axios";
function Viewbook(){
    const backend='https://book-review-backend-1tje.onrender.com';
    const navigate=useNavigate();
    const location=useLocation();
    const [details,setDetails]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState('');
    useEffect(()=>{
        setLoading(true);
        async function getBookDetail(){
            try{
                const result=await axios.get(`${backend}/books/${location.state.bookId}`);
                setDetails(result.data);
                setLoading(false);
            }catch(err){
                setLoading(false);
                console.error(err);
                setError(err.response?.data?.error||err.message||'could not fetch the details');
            }   
        }
        getBookDetail();
    },[]);
    if(loading){
        return(<div><h2>Loading...</h2></div>)
    }
    return(
        <div className="viewBookContainer">
            {error && <p className="message">{error}</p>}
            {details.map(detail=>(
                <div className="viewBookContainerChild">
                    <div className="viewBookContainerDetail">
                        <h3><strong>Title: </strong>{detail.title}</h3>
                        <p><strong>Author: </strong>{detail.author}</p>
                        <p><strong>published Year: </strong>{detail.published_year}</p>
                        <p><strong>Rating: </strong>{detail.rating}</p>
                    </div>
                    <div className="viewBookContainerDesc">
                        <p><strong>description: </strong>{detail.description}</p>
                    </div>
                </div>
            ))}
            <button type="button" onClick={()=>navigate('/homepage')}>Go To DashBoard</button>
        </div>
    )
}
export default Viewbook;