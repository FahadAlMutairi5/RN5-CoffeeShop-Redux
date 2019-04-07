import React, { Component } from "react";
import { connect } from "react-redux";

import {login , signup, checkForExpiredToken} from "../../store/actions/authActions";
// NativeBase Components
import {
  Text,
  Button,
  Body,
  List,
  ListItem,
  Form,
  Label,
  Input,
  Item,
  Content,
  Header
} from "native-base";
//Test
class Login extends Component {
  async componentDidMount(){
      await this.props.checkForExpiredToken();
      let {user}  = this.props.authReducer;
      if (user){
        this.props.navigation.replace("Profile");
      }   
  }
  state={
    username:"",
    password:""
  }
  render() {
    return (
      <Content>
        <Header transparent />
        <List>
          <ListItem style={{ borderBottomWidth: 0 }}>
            <Body>
              <Form>
                <Body>
                  <Label style={{ color: "white" }}>Username</Label>
                </Body>
                <Item
                  rounded
                  style={{
                    backgroundColor: "white",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <Input 
                    autoCorrect={false}
                    autoCapitalize="none" 
                    onChangeText={(username)=>this.setState({username})}
                  />
                </Item>
                <Body>
                  <Label style={{ color: "white" }}>Password</Label>
                </Body>
                <Item
                  rounded
                  style={{ backgroundColor: "white", marginTop: 10 }}
                >
                  <Input
                    autoCorrect={false}
                    onChangeText={(password)=>this.setState({password})}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </Item>
              </Form>
            </Body>
          </ListItem>
          <Button
            full
            success
            onPress={() => this.props.login(this.state , this.props.navigation)}
          >
            <Text>Login</Text>
          </Button>
          <Button
            full
            warning
            onPress={() => this.props.signup(this.state, this.props.navigation)}
          >
            <Text>Register</Text>
          </Button>
        </List>
        <Body>
          <Label style={{ color: "red", opacity: 0.6 }} />
        </Body>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  authReducer: state.authReducer
});
const mapDispatchToProps = dispatch => ({
  login: (user, navigate) => dispatch(login(user, navigate)),
});
export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
