import React, {PureComponent as Component} from "react";
import PropTypes from "prop-types";
import axios from 'axios'
import { Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd'
const { Option } = Select;
import ReportForm from '../../components/ReportForm'

class ReportNew extends Component {
  constructor(props) {
    super(props);
  }

   componentDidMount() {
  }

  static propTypes = {
    login: PropTypes.bool,
  };

  render() {
    return <div>
      <ReportForm />
    </div>
  }
}

export default Form.create()(ReportNew);
