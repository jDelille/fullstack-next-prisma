

import getUsers from "@/app/actions/getUsers";

const FollowUsers = async () => {

 const users = await getUsers()

 return (
  <div>
   {users.map((user) => (
    <div key={user.id}>{user.name}</div>
   ))}
  </div>
 );
}

export default FollowUsers;