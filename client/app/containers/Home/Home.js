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
  };
  onSubmit (e) {
    e.preventDefault()
    window.alert(e.target.url.value)
  }
  render() {
    return (
      <Content className={'index-content'}>
        <h1>
          Detecting Dark Patterns on websites
        </h1>
        <h2>
          Find out the Dark Pattern that show on the website. Create list of the detected Dark Pattern with category and numbers
        </h2>
        <div>
          <form action="" onSubmit={this.onSubmit}>
            <div>
              <input type="url" name="url" placeholder={'Enter Websites URL'}/>
              <button type={'submit'} >
                <img src="/assets/img/search.png" alt=""/>
              </button>
            </div>

          </form>
        </div>
      </Content>
    );
  }
}

export default Home;
