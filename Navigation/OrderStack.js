import { createStackNavigator, createAppContainer } from "react-navigation";

import Cart from "../Components/CoffeeCart";
import OrderHistory from "../Components/OrderHistory";
import CheckCartUth from "../Components/CheckCartUth";

const OrderStack = createStackNavigator(
  {
    CheckCartUth:CheckCartUth,
    CoffeeCart: Cart,
    OrderHistory: OrderHistory
  },
  {
    initialRouteName: "CheckCartUth",
    cardStyle: {
      backgroundColor: "rgb(20,90,100)"
    },
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "rgb(20,90,100)"
      },
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerTintColor: "white"
    }
  }
);

export default OrderStack;
