import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import {RootStackParamList} from "../../constants/Routes";

const LinkingConfigurationForUser: LinkingOptions<RootStackParamList> = {
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
          bottomTabUser:{
            screens: {
              home: {
                screens: {
                  HomeScreen: "home",
                },
              },
              sale: {
                screens: {

                },
              },
              notify: {
                screens: {
                  NotifyScreen:"notify"
                },
              },
              store: {
                screens: {

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

export default LinkingConfigurationForUser;
