import React, {PureComponent as Component} from "react";
import PropTypes from "prop-types";

class CurrentModel extends Component {
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
      current model
    </div>
  }
}

export default CurrentModel;
