import { useEffect,useState } from "react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext.jsx";
import axios from "axios";


const CaptainProtectWrapper = ({children}) => {
  const token = localStorage.getItem('token') ;

  const {captain, setCaptain,baseUrl} = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    if(!token) {
      console.error("No token found, redirecting to login");
      navigate('/captain-login');
    }
    else
    {
      axios.get(baseUrl+'/captains/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        if(response.status === 200) {
          console.log(response.data)
          setIsLoading(false);
        }
        else
        {
          console.error("Unexpected response status:", response.status);
          localStorage.removeItem('token');
          setIsLoading(false);
          navigate('/captain-login');
        }
        
      }).catch(error => {
        console.error("Error fetching captain profile:", error);
        localStorage.removeItem('token');
        setIsLoading(false);
        navigate('/captain-login');
      });
    }
  }, [token]);

  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {children}
    </>
  );
}
export default CaptainProtectWrapper