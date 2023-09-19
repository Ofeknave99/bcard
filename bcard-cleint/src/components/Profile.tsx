import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios"; // ייבוא מודול axios
import NavBar from "./NavBar";
import User from "../interfaces/User";
import { getUser } from "../services/UserSevices"; // שיניתי את השם כדי להתאים לשם הקובץ

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    getUser()
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
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
  );
};

export default Profile; // וודא שאתה מייצא את הקומפוננטה
