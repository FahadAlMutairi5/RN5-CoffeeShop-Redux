import React, { Component } from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";


class CheckCartUth extends Component {
    
    render() {
      this.props.user ? this.props.navigation.navigate("CoffeeCart") : this.props.navigation.navigate("Auth")
        return (
          <></>  
        );
    }
}
const mapStateToProps = state => ({
    user: state.authReducer.user
  });
export default withNavigation(connect(mapStateToProps)(CheckCartUth));