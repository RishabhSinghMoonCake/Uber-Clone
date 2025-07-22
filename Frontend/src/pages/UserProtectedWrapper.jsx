import { useContext, useEffect,useState } from "react";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router";
import axios from "axios";

const UserProtectedWrapper = ({children}) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
  const [loading , setIsLoading] = useState(true);
  if(!token)
  {
    useEffect(() => {
      navigate('/login')
    }, [])
    return null;
  }
  else
  {
    const {baseUrl} = useContext(UserDataContext);
    useEffect(() => {
      axios.get(baseUrl + '/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        setIsLoading(false);
        
      }).catch(error => {
        console.error("Error fetching user profile:", error);
        localStorage.removeItem('token');
        navigate('/login');
      });
    }, [token]);
    return (
      <>
        {loading ? <div>Loading...</div> : children}
      </>
    )
  }
}
export default UserProtectedWrapper