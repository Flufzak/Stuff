import { NavigatorScreenParams } from "@react-navigation/native";

export type HomeStackParamList = {
  ProductList: undefined;
  ProductDetail: { id: number };
};

export type RootTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  Cart: undefined;
  Profile: undefined;
};
