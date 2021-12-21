import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import {RootStackParamList} from "../../constants/Routes";

const LinkingConfigurationForAdmin: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens:{
          auth:{
            screens: {
              login:{
                screens: {}
              },
              register:{
                screens: {}
              }
            }
          },
          bottomTabAdmin:{
            screens: {
              home: {
                screens: {
                  HomeScreen: "home",
                },
              },
            },
          }
        }
      },
      NotFound: '*',
    },
  },
};

export default LinkingConfigurationForAdmin;
