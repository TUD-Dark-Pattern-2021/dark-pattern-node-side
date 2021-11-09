import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Layout,Breadcrumb, Icon } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
const { Content } = Layout

@connect(
  state => ({
    login: state.user.isLogin,
  }),
)
@withRouter
class Introduction extends Component {
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
      <Content className={'introduction-content'}>
       <h1>
          Sneak Into basket
          <img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket" width = "70px" height = "50px"/>
        </h1>
        
        <h2>
          What is Sneak Into basket?
        </h2>
        <p>
          Dark Patterns are tricks used in websites and apps that make you do things that you didn't mean to, like buying or signing up for something. The purpose of this site is to spread awareness and to shame companies that use them.
        </p>
        <div className={'youtube-video'}>
          <iframe src="https://www.youtube.com/embed/RHdv3n0CG3g" title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>

        </div>
        
      </Content>
    );
  }
}

export default Introduction;
