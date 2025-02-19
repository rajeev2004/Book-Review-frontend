import React,{useState,useEffect} from "react";
import {useLocation,useNavigate} from "react-router-dom";
import axios from "axios";
function Profile(){
    const backend='https://book-review-backend-1tje.onrender.com';
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState('');
    const navigate=useNavigate();
    const [userDetail,setUserDetail]=useState([]);
    useEffect(()=>{
        setLoading(true);
        async function getUserDetails(){
            try{
                const result=await axios.get(`${backend}/users/${localStorage.getItem('user_id')}`);
                setLoading(false);
                setUserDetail(result.data);
            }catch(err){
                console.error(err);
                setLoading(false);
                setError(err.response?.data?.error||err.message||'Something went wrong! try again');
            }
        }
        getUserDetails();
    },[]);
    if(loading){
        return(<div>Loading...</div>)
    }
    function EditProfile(){
        navigate('/editProfile',{
            state:{
                username:userDetail[0].username,
                email:userDetail[0].email
            }
        })
    }
    return(
        <div className="profileContainer">
            {userDetail.map(detail=>(
                <div className="profileDetail" key={detail.id}>
                    <p>{detail.username}</p>
                    <p>{detail.email}</p>
                </div>
            ))}
            {error && <p className="message">{error}</p>}
            <button type="button" onClick={EditProfile}>Edit Profile</button>
            <button onClick={()=>navigate('/homepage')}>Go To DashBoard</button>
        </div>
    )
}
export default Profile;