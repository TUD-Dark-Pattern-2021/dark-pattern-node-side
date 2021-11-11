import React, {PureComponent as Component} from "react";
import PropTypes from "prop-types";
import { Input, message } from 'antd';
import axios from 'axios'

const { Search } = Input;

class ModelTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textResult: '',
      imageUrl: '',
      imageResult: '',
      loading: false
    }
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
        this.setState({
          textResult: 'This is a Dark Pattern'
        })
      }
      if (result.data.data.isDarkPattern === 'No') {
        this.setState({
          textResult: 'This is not a Dark Pattern'
        })
      }
    }
  }

  async onSearchImage (value) {
    this.setState({
      imageUrl: value,
      loading: true
    })
    let result = await axios.post('/api/dp/checkOCR', {
      "content": value
    })
    if (result.data.data.content) {
       this.setState({
         imageResult: result.data.data.content,
         loading: false
       })
    }
  }
  render() {
    let {textResult, imageResult, imageUrl} = this.state
    return <div>
      Model Test

      <div style={{marginTop: '20px'}}>
        <Search
          style={{width: '40%'}}
          placeholder="Input DP Text"
          enterButton="Test"
          size="large"
          onSearch={(value) => this.onSearch(value)}
        />

      </div>
      <h2 style={{fontSize: 16}}>
          {textResult}
      </h2>
      <div style={{marginTop: '20px'}}>
        <Search
          style={{width: '40%'}}
          placeholder="Input Image Url"
          enterButton="Test"
          size="large"
          loading={this.state.loading}
          onSearch={(value) => this.onSearchImage(value)}
        />

      </div>
      <div>
        <p>This is the image</p>
        <img src={imageUrl} alt="" width={400}/>
        <p>This is the detected text</p>
        <p style={{background: '#fff', padding: 10}}>{imageResult}</p>
      </div>
    </div>
  }
}

export default ModelTest;
