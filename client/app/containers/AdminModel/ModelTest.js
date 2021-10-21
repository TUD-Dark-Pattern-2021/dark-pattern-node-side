import React, {PureComponent as Component} from "react";
import PropTypes from "prop-types";
import { Input, message } from 'antd';
import axios from 'axios'

const { Search } = Input;

class ModelTest extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {
  }

  static propTypes = {
    login: PropTypes.bool,
    // animeList: PropTypes.array,
    // getAnimeList: PropTypes.func
  };

  async onSearch (value) {
    let result = await axios.post('/api/dp/checkDP', {
      "content": value
    })
    if (result.data.data) {
      if (result.data.data.isDarkPattern === 'Yes') {
        message.error('This is a Dark Pattern');
      }
      if (result.data.data.isDarkPattern === 'No') {
        message.success('This is not a Dark Pattern');
      }
    }
    console.log(result)
  }
  render() {
    return <div>
      Model Test

      <div style={{marginTop: '20px'}}>
        <Search
          style={{width: '40%'}}
          placeholder="input DP text"
          enterButton="Test"
          size="large"
          onSearch={this.onSearch}
        />
      </div>

    </div>
  }
}

export default ModelTest;
