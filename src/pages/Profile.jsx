import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProfileApiAction } from "../redux/Reducers/UserReducer";
import OrderHistory from "../components/OrderHistory";

const Profile = () => {
  // const [userProfile,setUserProfile] = useState({});
  const { userProfile } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const getProfileApi = async () => {
    //dispatch logic gọi api từ action async (userReducer)
    const action = getProfileApiAction();
    dispatch(action);
  };

  useEffect(() => {
    //call api get profile
    getProfileApi();
  }, []);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-4">
          <img
            src={userProfile.avatar}
            alt="..."
            width={100}
            style={{ borderRadius: "50%" }}
          />
          <h3>Name: {userProfile.name}</h3>
          <h3>Email: {userProfile.email}</h3>
        </div>
        <div className="col-8">
          <form className="">
            <div className="form-group">
              <p>Email</p>
              <input className="form-control" id="email" name="email" />
            </div>
            <div className="form-group">
              <p>Password</p>
              <input className="form-control" id="password" name="password" />
            </div>
            <div className="form-group">
              <p>Name</p>
              <input className="form-control" id="name" name="name" />
            </div>
            <div className="form-group">
              <p>Phone</p>
              <input className="form-control" id="phone" name="phone" />
            </div>
            <div>
              <div className="form-check">
                <p>Gender</p>
                <input
                  value={true}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  value={false}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Female
                </label>
              </div>
            </div>

            {/* <div className="form-group">
        <select className="form-control" id="gender" name="gender">
          <option value={true}>Male</option>
          <option value={false}>Female</option>
        </select>
      </div> */}

            <div className="form-group">
              <button type="submit" className="btn btn-success mt-2">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <OrderHistory />
    </div>
  );
};

export default Profile;
