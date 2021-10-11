import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Layout } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
const { Content } = Layout
import { getAnimeList } from '../../reducer/modules/anime';
import AnimeList from "../../components/Anime/AnimeList";
import SearchForm from "../../components/Anime/SearchForm";

@connect(
  state => ({
    login: state.user.isLogin,
    animeList: state.anime.list
  }),
  {
    getAnimeList
  }
)
@withRouter
class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {
  }
  static propTypes = {
    login: PropTypes.bool,
    animeList: PropTypes.array,
    getAnimeList: PropTypes.func
  };
  render() {
    return (
      <Content>
        <SearchForm/>
        <AnimeList />
      </Content>
    );
  }
}

export default Home;
