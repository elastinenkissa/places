import UsersList from "../components/UsersList";

import uuid from 'react-uuid';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: "John Smith",
      image: "https://yt3.ggpht.com/a/AATXAJxGaC16CbfsAoWB7Q_hXMrnF4FU0AZO-D1ERA=s900-c-k-c0xffffffff-no-rj-mo",
      places: 5,
    },
    {
        id: 'u2',
        name: "Max Mustermann",
        image: "https://i.kym-cdn.com/photos/images/newsfeed/002/378/234/23a.png",
        places: 1,
      }
  ];

  return (
    <>
      <UsersList items={USERS}/>
    </>
  );
};

export default Users;
