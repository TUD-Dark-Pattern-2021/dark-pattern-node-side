import React, {PureComponent as Component} from "react";
import PropTypes from "prop-types";
import { Input, message, Button } from 'antd';
import axios from 'axios'

const { Search } = Input;

class ModelTraining extends Component {
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

  async onSubmit () {
    let result = await axios.post('/api/dp/autoTrain')
    if (result.data.data) {
      if (result.data.data === 'Yes') {
        message.success('success!');
      }
      if (result.data.data === 'No') {
        message.success('request failed!');
      }
    }
  }

  render() {
    let {textResult, imageResult, imageUrl} = this.state
    return <div>
      <div>
        Model Training
      </div>

      <div>
        <Button onClick={() =>this.onSubmit()}>Generate New Model</Button>
      </div>

    </div>
  }
}

export default ModelTraining;
