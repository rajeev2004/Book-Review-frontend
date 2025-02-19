import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
function AddBook(){
    const backend='https://book-review-backend-1tje.onrender.com';
    const [error,setError]=useState('');
    const [bookDetail,setBookDetail]=useState({title:'',author:'',description:'',published_year:''});
    const navigate=useNavigate();
    function handleChange(e){
        const {value,name}=e.target;
        setBookDetail((prev)=>(
            {...prev,[name]:value}
        ))
    }
    async function bookAdded(e){
        e.preventDefault();
        try{
            const result=await axios.post(`${backend}/books`,bookDetail);
            if(result.data.message==='book added'){
                alert('Book successfully added');
                setBookDetail({title:'',author:'',description:'',published_year:''});
            }
        }catch(err){
            console.error(err);
            setError(err.response?.data?.error||err.message||'cannot add the book');
        }
    }
    return(
        <div className="addBookContainer">
            <form className="form" onSubmit={bookAdded}>
                <div className="formChild">
                    <label>Title: </label>
                    <input type="text" name="title" value={bookDetail.title} onChange={handleChange} required />
                </div>
                <div className="formChild">
                    <label>Author: </label>
                    <input type="text" name="author" value={bookDetail.author} onChange={handleChange} required />
                </div>
                <div className="formChild">
                    <label>Published Year: </label>
                    <input type="number" name="published_year" value={bookDetail.published_year} onChange={handleChange} required />
                </div>
                <div className="formChild">
                    <label>Description: </label>
                    <textarea type="text" name="description" value={bookDetail.description} onChange={handleChange} rows='4' cols='40' required />
                </div>
                {error && <p className="message">{error}</p>}
                <div className="formChild">
                    <button type="submit">Add Book</button>
                </div>
                <button type="button" onClick={()=>navigate('/homepage')}>Go To Homepage</button>
            </form>
        </div>
    )
}
export default AddBook;