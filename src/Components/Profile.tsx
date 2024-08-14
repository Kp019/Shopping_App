import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
// import LoginButton from "";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
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