import React, { useContext } from "react";
import { Context } from "../index";
import Loader from "../components/Loader";

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);

  return loading ? (
    <Loader />
  ) : (
    <div className="profile">
      <div>
      <h1>Name:{user.name}</h1>
      <h1>Email:{user.email}</h1>
      </div>
      
    </div>
  );
};

export default Profile;
