import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Layout } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AnimeList from "../../components/Anime/AnimeList";
const Content = Layout.Content

@connect(
  state => ({
    login: state.user.isLogin
  })
)
@withRouter
class MyFavorites extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {}
  static propTypes = {
    login: PropTypes.bool,
    history: PropTypes.object,
  };
  render() {
    return (
      <Content>
        <AnimeList from={"my"}/>
      </Content>
    );
  }
}

export default MyFavorites;
