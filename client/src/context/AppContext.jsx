import axios from "axios";
import {useState, useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import {toast} from "react-hot-toast"
import { AppContext } from '../hooks/useAppContext.js';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

export const AppProvider = ({ children })=>{
    const currency = import.meta.env.VITE_CURRENCY || "$";
    const navigate = useNavigate();
    const {user} = useUser();
    const {getToken} = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);
    const [isLoadingUser, setIsLoadingUser] = useState(false);


    const fetchUser = useCallback(async()=>{
        try{
            let token;
            try {
                token = await getToken({ template: 'default' });
            } catch {
                token = await getToken();
            }
            if (!token) {
                toast.error('Not authenticated');
                return;
            }
            setIsLoadingUser(true);
            const {data}= await axios.get('/api/user',{headers:{Authorization:
                `Bearer ${token}`
            }, withCredentials: true})
            if(data.success){
                setIsOwner(data.role?.toLowerCase() === "hotelowner");
                setSearchedCities(data.recentSearchedCities)
            }else{
                setTimeout(()=>{
                    fetchUser()
                },5000)
            }
        }
        
        catch(error){
            toast.error(error.response?.data?.message || error.message || 'Network error');
            // Retry on network errors
            setTimeout(()=>{
                fetchUser()
            },5000)
        } finally {
            setIsLoadingUser(false);
        }
    }, [getToken])

    useEffect(()=>{
        if(user){
            fetchUser();
        }
        return () => {
            // Cleanup any pending timeouts if component unmounts
        };
    },[user, fetchUser])


    const value = {
        currency,navigate,user, getToken,isOwner, setIsOwner, axios,
        showHotelReg,setShowHotelReg, searchedCities, setSearchedCities, isLoadingUser

    }
    
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>

    )
}