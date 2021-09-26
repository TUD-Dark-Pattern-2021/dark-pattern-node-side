import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import { Button, Layout, Icon, message, Empty } from 'antd';
import PropTypes from 'prop-types';
import {getAnimeList} from "../../reducer/modules/anime";
import {addToFavorite, checkLoginState, delFavorite} from '../../reducer/modules/user'

@connect(
  state => ({
    user: state.user,
    animeList: state.anime.list
  }),
  {
    getAnimeList,
    addToFavorite,
    checkLoginState,
    delFavorite
  }
)

@withRouter
class AnimeList extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    user: PropTypes.object,
    animeList: PropTypes.array,
    getAnimeList: PropTypes.func,
    addToFavorite: PropTypes.func,
    checkLoginState: PropTypes.func,
    delFavorite: PropTypes.func
  }
  async componentDidMount() {
    if (this.props.location.pathname === '/') {
      await this.props.getAnimeList()
    }
  }
  toggleFavorite (item, bool) {
    if (this.props.user.isLogin) {
      bool ? this.delAnimeTofavorite(item) : this.addAnimeToFavorite(item)
      return
    }
    message.info('please sign in to collect')
  }
  async addAnimeToFavorite (item) {
    let result = await this.props.addToFavorite(item)
    if (result.payload.data.errcode === 0) {
      this.props.checkLoginState()
    }
  }
  async delAnimeTofavorite (item) {
    let result = await this.props.delFavorite(item._id)
    if (result.payload.data.errcode === 0) {
      this.props.checkLoginState()
    }
  }
  render () {
    let {favorites, isLogin} = this.props.user
    let favoriteList = favorites
    console.log(favoriteList, 'favoriteList')
    let animeList = this.props.from === 'my' ? this.props.user.favorites :this.props.animeList
    return (
      <div className="anime-list">
        {
          animeList.map((item) => {
            let isFavorite
            if (!isLogin) {
              isFavorite = false
            } else {
              isFavorite = favoriteList.find(ele => ele._id === item._id)
            }
            return (
              <div key={item._id} className="anime-item">
                <img src={item.imgUrl} alt=""/>
                <div>
                  <h2>{item.title} <span>({item.start_year} - {item.end_year === '0' ? '' : item.end_year})</span></h2>
                  <p className="tag">{item.tag.join(',')}</p>
                  <p><Icon type="star" theme="filled" style={{color: '#A58500',marginRight: '5px'}}/>{item.rate}</p>
                  <p>{item.desc}</p>
                  <br/>
                  <p className="star" style={{color: '#aaa'}}>Stars: {item.stars.join(', ')}</p>
                </div>
                <div className={"heart " + (isFavorite ? 'is-active': '')}
                     onClick={() => this.toggleFavorite(item, isFavorite)}>
                </div>
              </div>
            )
          }
          )
        }
        {
          animeList.length === 0 && <Empty />
        }
      </div>
    )
  }
}

export default AnimeList
