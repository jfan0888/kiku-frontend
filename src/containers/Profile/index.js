import React from 'react';
import Avatar from 'react-avatar';

import { GeneralView, CustomInput } from '../../components';
import './styles.scss';

const userAvatar = require('../../assets/users/user-01.png');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        firstName: 'Mike',
        lastName: 'Willis',
        email: 'mike.willis@gmail.com',
        password: 'password',
        ascap: 'ASCAP',
        phoneNumber: '+447399840987',
      },
      profileImage: userAvatar,
    };
    this.avatarInput = React.createRef();
  }

  uploadAvatar = () => {
    this.avatarInput.click();
  };

  replaceAvatar = e => {
    this.setState({ profileImage: URL.createObjectURL(e.target.files[0]) });
  };

  render() {
    const { userInfo, profileImage } = this.state;

    return (
      <GeneralView title="Profile">
        <div className="profile-content">
          <Avatar
            round
            size="100"
            src={profileImage}
            className="avatar-wrapper"
            onClick={this.uploadAvatar}
          />
          <input
            ref={input => (this.avatarInput = input)}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={this.replaceAvatar}
          />
          <div className="user-info-wrapper">
            <CustomInput
              editable
              className="user-profile-input-item"
              type="text"
              placeholder="First Name"
              value={userInfo.firstName}
            />
            <CustomInput
              editable
              className="user-profile-input-item"
              type="text"
              placeholder="Last Name"
              value={userInfo.lastName}
            />
            <CustomInput
              editable
              className="user-profile-input-item"
              type="email"
              placeholder="Email"
              value={userInfo.email}
            />
            <CustomInput
              editable
              className="user-profile-input-item"
              type="password"
              placeholder="Password"
              value={userInfo.password}
            />
            <CustomInput
              editable
              className="user-profile-input-item"
              type="ascap"
              placeholder="ASCAP"
              value={userInfo.ascap}
            />
            <CustomInput
              editable
              className="user-profile-input-item"
              type="phone"
              placeholder="Phone Number"
              value={userInfo.phoneNumber}
            />
          </div>
        </div>
      </GeneralView>
    );
  }
}

export default Profile;
