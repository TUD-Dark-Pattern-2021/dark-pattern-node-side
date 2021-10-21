import React, {PureComponent as Component} from "react";
import PropTypes from "prop-types";

class AdminHome extends Component {
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
      Welcome!
    </div>
  }
}

export default AdminHome;
