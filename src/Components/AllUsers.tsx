// import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { PrimaryButton } from "./ui-components/Button";

const AllUserData = () => {
//   const { getAccessTokenSilently, user } = useAuth0();
  const [MgmtTkn, setMgmtTkn] = useState('')
  const [users, setUsers] = useState([])
  const [search,setSearch] = useState('')

  async function getData() {
    // const yourMgmtApiAccessToken = await getAccessTokenSilently();

    const options = {
      method: 'POST',
      url: 'https://dev-bpz3fesbt2epuh37.us.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      data: {
        client_id: "l9Md6MzYTwGbnZM0TnmFyC5QybWCmq4S",
        client_secret: "ctQrFX76xRrUC9EdE_72yfJJc5lOEGsz0s9ULT71OQYWIZBsBCkOLOuC7mn-C3_3",
        audience: "https://dev-bpz3fesbt2epuh37.us.auth0.com/api/v2/",
        grant_type: "client_credentials"
      }
    };

    try {
      const response = await axios(options);
    //   console.log(response.data);
      setMgmtTkn(response.data.access_token);
    } catch (error) {
      console.error(error);
    }
  }

  async function getUsers() {
    const options = {
      method: 'GET',
      url: 'https://dev-bpz3fesbt2epuh37.us.auth0.com/api/v2/users',
      headers: {
        'Authorization': `Bearer ${MgmtTkn}`,
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await axios(options);
    //   console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleUserDelete = (id:string) => {
    console.log(id)
    const config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://dev-bpz3fesbt2epuh37.us.auth0.com/api/v2/users/${id}`,
      headers: { 
        'Authorization': `Bearer ${MgmtTkn}`,
        'Content-Type': 'application/json'
       }
    };
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

  }

  const handleAddNewUser = () => {
    const data = JSON.stringify({
      "email": "user@example.com",
      "phone_number": "string",
      "user_metadata": {},
      "blocked": false,
      "email_verified": false,
      "phone_verified": false,
      "app_metadata": {},
      "given_name": "string",
      "family_name": "string",
      "name": "string",
      "nickname": "string",
      "picture": "string",
      "user_id": "string",
      "connection": "string",
      "password": "string",
      "verify_email": false,
      "username": "string"
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://login.auth0.com/api/v2/users',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
      },
      data : data
    };

    axios.request(config).then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

}


  useEffect(() => {
    getData();
  }, [users]);

  useEffect(() => {
    if (MgmtTkn) {
      getUsers();
    }
  },[MgmtTkn]);

  return (
    <div className="flex flex-col justify-center items-center pb-60 pt-20">
    <div className="flex sm:flex-row flex-col gap-5 items-center pt-5 ">
        <div className="">
            <input className=" sm:w-96 w-[300px] p-2 rounded-md bg-stone-300" onChange={(e)=>{setSearch(e.target.value)}} type="text" placeholder="search via mail"/>
        </div>
        {/* <div onClick={handleAddNewUser}><PrimaryButton btnName={'Add New User'}/></div> */}
    </div>
    <div className="flex flex-wrap gap-5 justify-center items-center py-10">
      {users.filter(
        (user) => user.email.includes(search)
      ).map((user)=>{
        return (
            <div className="flex sm:w-[350px] w-[300px] flex-col flex-wrap justify-center items-center rounded-md" key={user.user_id}>
                <div className="flex flex-col justify-center items-center shadow-xl py-10 px-5 gap-5 rounded-md">
                    <div className="w-40 overflow-hidden">
                        <img className="w-40 rounded-md" src={user.picture} alt="" />
                    </div>
                    <div className=" font-bold text-xl overflow-clip flex text-center">{user.name}</div>
                    <h1>{user.email}</h1>
                    <div className="flex gap-5">
                        <div onClick={()=> handleUserDelete(user.user_id)}><PrimaryButton btnName = {'remove'}/></div>
                        {/* <div ><SecondaryButton btnName={'edit'}/></div> */}
                    </div>
                </div>
            </div>
        )
      })}
    </div>
    </div>
  );
};

export default AllUserData;