import Sidebar from "../components/Sidebar";
import editIcon from "../assets/edit.svg";
import EditProfileModalModal from "../pages/EditProfileModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { auth } = useContext(AuthContext);

  const [modalIsOpen, setIsOpen] = useState(false);
  const handleEdit = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="container">
        <Sidebar auth={auth} />
        <main>
          <div className="wrapper">
            <div className="profile-con"></div>
            <div className="top-navigation">
              <p className="header">Profile Settings</p>
            </div>

            <div className="profile-section">
              <div className="section-header">
                <h2 className="section-title">Personal Information</h2>
                <Link
                  to=""
                  className="table-action-link"
                  onClick={() => handleEdit()}
                >
                  <img src={editIcon} style={{ width: "16px" }} />
                  Edit
                </Link>
              </div>

              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={auth?.name}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" disabled>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={auth?.email}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="budget" disabled>
                    Budget
                  </label>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    value={auth?.budget}
                    disabled
                  />
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      <EditProfileModalModal
        auth={auth}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default Profile;
