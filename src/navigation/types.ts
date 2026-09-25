import { Car } from '../types';

export type HomeStackParamList = {
  HomeList: undefined;
  HomeDetail: {
    car: Car;
  };
};

export type RootTabParamList = {
  Home: undefined;
  Favorites: undefined;
};
