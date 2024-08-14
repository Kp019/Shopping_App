import { useEffect, useState } from 'react';
import AdminProductsList from './AdminProductsList';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../Components/ui-components/Button';
import BottomBar from '../Components/BottomBar';
// import { useDispatch, useSelector } from 'react-redux';


const AdminPortal = () => {
    const [selectedComponent, setSelectedComponent] = useState(<AdminProductsList/>)
    const {user} = useAuth0()
    const [isAuth, setIsAuth] = useState(false)
    const navigate = useNavigate()
    // const [isOpen, setIsOpen] = useState(true)
    
    useEffect(()=>{
        if(user?.email === "krishnaprasadr666@gmail.com"){
         setIsAuth(true)   
        }
    }, [user])

    const handleComponentSelect = (component:JSX.Element) => {
        setSelectedComponent(component)
    }

    if(!isAuth){
        return(
            <div className='flex flex-col justify-center items-center h-[100vh]'>
                <div className=' font-bold text-7xl text-center'>ERROR 404</div>
                <p className='text-xl pt-3'>Page not found</p>
                <button className='pt-5' onClick={()=>{navigate(-1)}}><PrimaryButton btnName = {'Go Back'}/></button>
            </div>
        )
    }

    return (
        <div className=' flex flex-col relative md:justify-between w-full md:h-[100vh] md:overflow-hidden'>
            <div className=' fixed z-20 w-full flex justify-center items-center'>
                <BottomBar component = {handleComponentSelect} />
            </div>
            <div className='flex justify-center w-full overflow-y-auto'>
            {selectedComponent}
            </div>
        </div>
    );
};

export default AdminPortal;
