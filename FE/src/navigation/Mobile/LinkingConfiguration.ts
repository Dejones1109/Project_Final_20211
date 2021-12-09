import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import {RootStackParamList} from "../../constants/Routes";

const LinkingConfiguration: LinkingOptions<RootStackParamList> = {
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
          bottomTab:{
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

export default LinkingConfiguration;
