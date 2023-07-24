import { FunctionComponent, useEffect, useState } from "react";
import NavBar from "./NavBar";
import { getUserByEmail } from "../services/UserSevices";
import User from "../interfaces/User";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  let [userInfo, setUserInfo] = useState<User>();
  useEffect(() => {
    getUserByEmail(JSON.parse(sessionStorage.getItem("userInfo") as string).email)
      .then((res) => {
        if (res.data.length) {
          setUserInfo(res.data[0]);
        }
      })
      .catch((err) => console.log(err));
  });

  return (
    <>
    <div className="container col-md-3 mt-5 vh-100 r">
      <div className="card">
        <div className="card-title">
          {userInfo?.name}
          <br />
          {userInfo?.image && (
            <img src={userInfo?.image} alt="User" style={{ width: "80px" }} />
          )}
        </div>

        <div className="card-body">
          <div className="card-text">{userInfo?.email}</div>
     {userInfo?.role === "business" && <p>This user is business</p>}
{userInfo?.role === "Regular" && <p>Regular user</p>}
{userInfo?.role === "admin" && <p>admin user</p>}

        </div>
      </div>
      </div>
    </>
  );
};

export default Profile;

