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
          Introduction
        </h1>
        <h2>
          What is Dark Pattern ?
        </h2>
        <p>
          Dark Patterns are tricks used in websites and apps that make you do things that you didn't mean to, like buying or signing up for something. The purpose of this site is to spread awareness and to shame companies that use them.
        </p>
        <div className={'youtube-video'}>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/kxkrdLI6e6M" title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>
        </div>
      </Content>
    );
  }
}

export default Introduction;
