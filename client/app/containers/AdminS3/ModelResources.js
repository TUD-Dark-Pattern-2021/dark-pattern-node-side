import React, {PureComponent as Component} from "react";
import PropTypes from "prop-types";

class ModelResources extends Component {
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

  render() {
    return <div>
      ModelResources
    </div>
  }
}

export default ModelResources;
