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
class AboutUs extends Component {
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
      <Content className={'about-us-content'}>
        <h1>
          Who are we?
        </h1>
        <p>
          We are a student group from TUD
        </p>
        <h1>
          What do we do?
        </h1>
        <p>
          We are committed to research in the direction of Dark Pattern and hope to apply the theory to practice.
        </p>
        <h1>
          Contact Us
        </h1>
        <p>
          <a href="mailto:andrea.f.curley@TUDublin.ie">Andrea.Curley</a>
          <br/>
          <a href="mailto:damian.x.gordon@tudublin.ie">Damian.Gordon</a>
        </p>
      </Content>
    );
  }
}

export default AboutUs;
