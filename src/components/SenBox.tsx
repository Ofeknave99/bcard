import { FunctionComponent, useEffect, useState } from "react";
import { deleteuser, getuser } from "../services/UserSevices";
import User from "../interfaces/User";
import { error } from "console";
import { successMsg } from "../services/feedbackServicw";

interface SenBoxProps {
    
}
 
const SenBox: FunctionComponent<SenBoxProps> = () => {
     let [users, setusers] = useState<User[]>([]);
     let [dataChanged, setDataChanged] = useState<boolean>(false);
    useEffect(()=>{
        getuser()
        .then((res)=>setusers(res.data) )
        .catch((error)=>console.log(error)
        );
    })
     let handleDelete = (id: number) => {
    if (window.confirm("Are you sure?")) {
      deleteuser(id)
        .then(() => {
          successMsg('User deleted successfully');
          setDataChanged(!dataChanged);
        })
        .catch((error) => console.log(error));
    }
  };
    
    return ( <>
     <div className="container col-md-3 mt-5 vh-100  vw-100 ">
     {users.length ? (<table className="table table-dark  vw-80 ">
            <thead><tr>
            <th>Id</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
            </tr></thead>
           <tbody>
              {users.map((users: User) => (
                <tr key={users.id}>
                  <td>{users.id}</td>
                  <td>{users.name}</td>
                  <td>{users.lastName}</td>
                  <td>{users.phone}</td>
                  <td>{users.email}</td>
                  <td>{users.role}</td>
                   <td><i className="fa-solid fa-user-xmark text-danger" onClick={() => handleDelete(users.id as number)}></i></td>
                  </tr>
              ))}
            </tbody>
        </table>) : (<p>no users yet</p>)}
     </div>
    
    </> );
}
 
export default SenBox;