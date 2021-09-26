import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'
import {Button, message, Row, Col, Layout, Input, Tooltip, Upload, Modal} from 'antd';
import axios from 'axios'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { setImageUrl, checkLoginState } from '../../reducer/modules/user';
const { Content } = Layout
const ButtonGroup = Button.Group;
const { confirm } = Modal;

@connect(
  state => ({
    login: state.user.isLogin,
    user: state.user
  }),
  {
    setImageUrl,
    checkLoginState
  }
)
@withRouter
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempUserName: "",
      usernameEdit: false,
      secureEdit: false,
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    console.log(this.props)
  }
  static propTypes = {
    login: PropTypes.bool,
    history: PropTypes.object,
    user: PropTypes.object,
    setImageUrl: PropTypes.func,
    checkLoginState: PropTypes.func
  };
  handleEdit = (key, val) => {
    var s = {};
    s[key] = val;
    this.setState(s);
  };
  updateUserinfo () {
    let value = this.state.tempUserName;
    let params = { uid: this.props.user.uid };
    params.username = value;

    axios.put('/api/user/update', params).then(
      res => {
        let data = res.data;
        if (data.errcode === 0) {
          this.setState({
            tempUserName: ''
          });
          this.props.checkLoginState()
          this.handleEdit('usernameEdit', false);
          message.success('username update success');
        } else {
          message.error(data.errmsg);
        }
      },
      err => {
        message.error(err.message);
      }
    );
  };
  updatePassword = () => {
    let old_password = document.getElementById('old_password').value;
    let password = document.getElementById('password').value;
    let verify_pass = document.getElementById('verify_pass').value;
    if (password != verify_pass) {
      return message.error('two passwords are not the same');
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
      message.error('password must contain at least eight characters, at least one number and both lower and uppercase letters!')
      return
    }
    let params = {
      uid: this.props.user.uid,
      password: password,
      old_password: old_password
    };

    axios.put('/api/user/change_password', params).then(
      res => {
        let data = res.data;
        if (data.errcode === 0) {
          this.handleEdit('secureEdit', false);
          message.success('password modify success, please sign up');
          this.props.checkLoginState()
        } else {
          message.error(data.errmsg);
        }
      },
      err => {
        message.error(err.message);
      }
    );
  };
  formatTime (timestamp){
    return moment.unix(timestamp).format('DD-MM-YYYY HH:mm:ss');
  };
  uploadAvatar(basecode) {
    axios
      .post('/api/user/upload_avatar', { basecode: basecode })
      .then(() => {
        this.props.setImageUrl(basecode);
      })
      .catch(e => {
        console.log(e);
      });
  }
  beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    console.log(isJPG, isPNG, 'isPNG')
    if (!isJPG && !isPNG) {
      message.error('avatar format can only be jpg、png！');
    }
    const isLt2M = file.size / 1024 / 1024 < 0.2;
    if (!isLt2M) {
      message.error('picture size should be less than 200kb!');
    }

    return (isPNG || isJPG) && isLt2M;
  }
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleChange(info) {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, basecode => {
        this.uploadAvatar(basecode);
      });
    }
  }
  confirmDeleteAccount () {
    let _this = this
    confirm({
      title: 'Are you sure deleting your account?',
      content: 'Deleting is unrecoverable!',
      onOk() {
        axios
          .delete('/api/user/delete')
          .then((res) => {
            if (res.data.errcode === 0) {
              message.success('Account deletion successful')
              _this.props.checkLoginState()
            }
          })
          .catch(e => {
            console.log(e);
          });
      },
    })
  }
  render() {
    let { user }= this.props;
    let userNameEditHtml, secureEditHtml
    let {tempUserName, usernameEdit} = this.state
    if (usernameEdit === false) {
      userNameEditHtml = (
        <div>
          <span className="text">{user.userName}</span>&nbsp;&nbsp;
          <Button
            icon="edit"
            onClick={() => this.handleEdit('usernameEdit', true)}
          >
            Change
          </Button>
        </div>
      );
    } else {
      userNameEditHtml = (
        <div>
          <Input
            value={tempUserName}
            name="username"
            placeholder="Input New Username"
            onChange={e => this.setState({tempUserName: e.target.value})}
            autoComplete={'off'}
          />
          <ButtonGroup className="edit-buttons">
            <Button
              className="edit-button"
              onClick={() => {
                this.handleEdit('usernameEdit', false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="edit-button"
              onClick={() => {
                this.updateUserinfo('username');
              }}
              type="primary"
            >
              Submit
            </Button>
          </ButtonGroup>
        </div>
      );
    }
    if (this.state.secureEdit === false) {
      secureEditHtml = (
          <Button
            icon="edit"
            onClick={() => {
              this.handleEdit('secureEdit', true);
            }}
          >
            Change
          </Button>
        );
    } else {
      secureEditHtml = (
        <div>
          <Input
            placeholder="Old Password"
            type="password"
            name="old_password"
            id="old_password"
          />
          <Input placeholder="New Password" type="password" name="password" id="password" />
          <Input placeholder="Confirm Password" type="password" name="verify_pass" id="verify_pass" />
          <ButtonGroup className="edit-buttons">
            <Button
              className="edit-button"
              onClick={() => {
                this.handleEdit('secureEdit', false);
              }}
            >
              Cancel
            </Button>
            <Button className="edit-button" onClick={this.updatePassword} type="primary">
              Submit
            </Button>
          </ButtonGroup>
        </div>
      );
    }
    return (
      <Content className="user-profile">
          <h3>Profile Settings</h3>
          <Row className="avatar-wrapper" type="flex" justify="start" align={"bottom"}>
            <Col span={4} style={{marginRight: 20}}>
              <div style={{textAlign: "right"}}>
                <Upload
                  className="avatar-uploader"
                  name="basecode"
                  showUploadList={false}
                  action="/api/user/upload_avatar"
                  beforeUpload={this.beforeUpload}
                  onChange={(info) => this.handleChange(info)}
                >
                  <div className={"avatar-img"}>
                    <img className="avatar" src={user.imgUrl ? user.imgUrl : `/api/user/avatar/${user.uid}`} />
                  </div>
                </Upload>
              </div>
            </Col>
            <Col span={12}>
              <p style={{color: '#aaa'}}>click avatar to upload new avatar <br/>(only support format jpg,png and avatar size can't over 200kb)</p>
            </Col>
          </Row>
          <Row className="user-item" type="flex" justify="start">
            <Col span={4}>User ID</Col>
            <Col span={12}>{user.uid}</Col>
          </Row>
          <Row className="user-item" type="flex" justify="start">
            <Col span={4}>Username</Col>
            <Col span={12}>{userNameEditHtml}</Col>
          </Row>
          <Row className="user-item" type="flex" justify="start">
            <Col span={4}>Email</Col>
            <Col span={12}><span className="text">{user.email}</span>&nbsp;&nbsp;</Col>
          </Row>
          <Row className="user-item" type="flex" justify="start">
            <Col span={4}>Create Time</Col>
            <Col span={12}>{this.formatTime(user.add_time)}</Col>
          </Row>
          <Row className="user-item" type="flex" justify="start">
            <Col span={4}>Update Time</Col>
            <Col span={12}>{this.formatTime(user.up_time)}</Col>
          </Row>
          <Row className="user-item" type="flex" justify="start">
            <Col span={4}>Password</Col>
            <Col span={12}>{secureEditHtml}</Col>
          </Row>
          <Row className="user-item" type="flex" justify="start">
            <Col span={4} />
            <Col span={12}>
              <Button type="danger" onClick={() => this.confirmDeleteAccount()}>Delete Account</Button>
            </Col>
          </Row>
      </Content>
    );
  }
}

export default Profile
