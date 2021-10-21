import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export function requireAuthentication(Component) {
  return @connect(
    state => {
      return {
        isAuthenticated: state.user.isLogin
      };
    }
  )
  class AuthenticatedComponent extends React.PureComponent {
    constructor(props) {
      super(props);
    }
    static propTypes = {
      isAuthenticated: PropTypes.bool,
      location: PropTypes.object,
      dispatch: PropTypes.func,
      history: PropTypes.object,
    };
    componentWillMount() {
      this.checkAuth();
    }
    componentWillReceiveProps() {
      this.checkAuth();
    }
    checkAuth() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/login');
      }
    }
    render() {
      return <div>{this.props.isAuthenticated ? <Component {...this.props} /> : null}</div>;
    }
  };
}
