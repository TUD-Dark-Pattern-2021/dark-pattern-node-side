import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Layout } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
const { Content } = Layout

@connect(
  state => ({
    login: state.user.isLogin,
  }),
)
@withRouter
class ChromeExtension extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {
  }
  static propTypes = {
    login: PropTypes.bool,
  };
  onSubmit (e) {
    e.preventDefault()
    window.alert(e.target.url.value)
  }
  render() {
    return (
      <Content className={'chrome-extention-content'}>
        <h1>
          Chrome Extension
        </h1>
        <p style={{margin: '20px 0'}}>
          Our Detect Dark Pattern Extension can auto detect the dark patterns when you explore websites, which can protect you from being harmed.
        </p>
        <a href="https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd" target={"_blank"} style={{display: 'block', textAlign: 'center'}}>
          <img src="/assets/img/chrome.png" alt="" style={{width: 32, marginRight: 20}}/>
          Install Detect Dark Pattern Extension Now!
        </a>
      </Content>
    );
  }
}

export default ChromeExtension;
