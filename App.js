import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import reducer from './reducers'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/api'

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
  }
},
AddDeck: {
  screen: AddDeck,
  navigationOptions: {
    tabBarLabel: 'Add Deck',
    tabBarIcon: ({ tintColor }) => <MaterialIcons name='add-circle-outline' size={30} color={tintColor} />
}
}
},{
  tabBarOptions: {
    style: {
      height: 56,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    }
},
  Deck: {
    screen: Deck,
    navigationOptions: ({navigation}) => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#3399ff',
    },
    title: `${navigation.state.params.title}`
  })
},
AddCard: {
  screen: AddCard,
  navigationOptions: ({navigation}) => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#3399ff'
    },
    title: 'Add Card'
  })
},
Quiz: {
  screen: Quiz,
  navigationOptions: ({navigation}) => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#3399ff'
    },
    title: 'Quiz'
  })
}
},
)

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {

    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <StatusBar translucent barStyle='light-content'/>
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
