import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Components/LogoutButton";
import LoginButton from "../Components/LoginButton";

function ShowProfile() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if(isLoading){
      return(
          <div className='flex justify-center items-center h-[100vh]'>
            <svg className='w-80 flex justify-center items-center' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="none" stroke-opacity="1" stroke="#bff3ff" stroke-width=".5" cx="100" cy="100" r="0"><animate attributeName="r" calcMode="spline" dur="2" values="1;80" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="stroke-width" calcMode="spline" dur="2" values="0;25" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" calcMode="spline" dur="2" values="1;0" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate></circle></svg>
          </div>
      )
    }
    
      return (
        isAuthenticated ? (<div className="flex flex-col justify-center items-center h-[100vh]">
            <div className=" flex flex-col justify-center items-center py-20 px-10 gap-5 rounded-md">
                <img className=" w-40 rounded-full" src={user?.picture} alt={user?.name} />
                <div className="flex justify-center items-center flex-col gap-3">
                    <h2 className="text-4xl font-boldl">{user?.name}</h2>
                    <p className="text-xl">{user?.email}</p>
                </div>
                <div className="flex gap-3">
                  <LogoutButton/>
                  <button className="bg-stone-700 text-white px-4 py-2 rounded-md" onClick={()=>{window.location.href='/'}}>Home</button>
                </div>
                </div>
          </div>) : <div> <LoginButton/> </div>
      );
}

export default ShowProfile
