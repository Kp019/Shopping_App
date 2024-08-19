import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
// import LoginButton from "";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if(isLoading){
    return(
        <div className='flex justify-center items-center'>
          <svg className='w-80 flex justify-center items-center' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="none" stroke-opacity="1" stroke="#0a354a" stroke-width=".5" cx="100" cy="100" r="0"><animate attributeName="r" calcMode="spline" dur="2" values="1;80" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="stroke-width" calcMode="spline" dur="2" values="0;25" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" calcMode="spline" dur="2" values="1;0" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate></circle></svg>
        </div>
    )
  }

  return (
    isAuthenticated ? (
      <div className="rounded-full overflow-hidden">
        <img className="w-12" src={user?.picture} alt={user?.name} />
      </div>
    ):<div><LoginButton/></div>
  );
};

export default Profile;