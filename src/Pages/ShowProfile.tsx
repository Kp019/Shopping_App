import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Components/LogoutButton";
import LoginButton from "../Components/LoginButton";

function ShowProfile() {
    const { user, isAuthenticated, isLoading } = useAuth0();

      if (isLoading) {
        return <div>Loading ...</div>;
      }
    
      return (
        isAuthenticated ? (<div className="flex flex-col justify-center items-center h-[100vh]">
            <div className="bg-[#fff89b] flex flex-col justify-center items-center py-20 px-10 gap-5 rounded-md">
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
