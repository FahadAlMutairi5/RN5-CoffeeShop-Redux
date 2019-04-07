import React, { Component } from "react";
import { connect } from "react-redux";
// NativeBase Components
import { List, Content, Spinner , Button, Text} from "native-base";

// Store
import coffeeshops from "./list";
import { logout } from "../../store/actions/authActions";

// Component
import CoffeeItem from "./CoffeeItem";
import CartButton from "../CartButton";

class CoffeeList extends Component {
  static navigationOptions = {
    title: "Coffee List",
    headerRight: <CartButton />
  };

  render() {
    const { coffeeShops, loading } = this.props.coffeeReducer;
    let shops;

    if (loading) {
      return <Spinner />;
    }
    shops = coffeeShops.map(coffeeShop => (
      <CoffeeItem coffeeShop={coffeeShop} key={coffeeShop.id} />
    ));

    return (
      <Content>
        <List>{shops}</List>
        <Button
            full
            success
            onPress={this.props.logout}
          >
            <Text>Logout</Text>
          </Button>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  coffeeReducer: state.coffeeReducer
});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  
});
export default connect(mapStateToProps, mapDispatchToProps)(CoffeeList);
