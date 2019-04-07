import React, { Component } from "react";
import { Text, View , Button} from "native-base";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";

class Profile extends Component {
  componentDidMount(){
    this.props.navigation.navigate("Coffee")
  }
  render() {
    return (
      <View>
        <Text>PROFILE PAGE</Text>
      </View>
    );
  }
}
//logout dis
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  
});

export default  connect(
  mapDispatchToProps
)(Profile);
