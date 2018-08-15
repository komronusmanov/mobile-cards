import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo';

export const DECK_STORAGE_KEY = 'UdaciCards:decks'
export const NOTIFICATION_KEY = 'UdaciCards:notification'


const decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      },
      {
        question: 'Inside what HTML element do we put the JavaScript?',
        answer: '<script>'
      },
      {
        question: 'What built-in method removes the last element from an array and returns that element?',
        answer: 'pop()'
      },
      {
        question: 'What built-in method returns the calling string value converted to upper case?',
        answer: 'toUpperCase()'
      },
      {
        question: 'What is true about typeof operator in JavaScript?',
        answer: 'Both of the above.'
      }
    ]
  },
  HTML: {
    title: 'HTML',
    questions: [
      {
        question: 'What does HTML stand for?',
        answer: 'Hyper Text Markup Language'
      },
      {
        question: 'Who is making the Web standards?',
        answer: 'The World Wide Web Consortium'
      },
      {
        question: 'What is the correct HTML element for inserting a line break?',
        answer: '<br>'
      },
      {
        question: 'What is the correct HTML for adding a background color?',
        answer: '<body style="background-color:yellow;">'
      }
    ]
  }
}
export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      return decks
    })
}

export function getDeck(title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((decks) => (decks[title]))
}

export function saveNewDeck(deck) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(deck))
}

export function addNewCard(entry, key) {

  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results)
      decks[key].questions.push(entry)
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
    })
}


export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Hey There',
    body: "👋 Don't forget to take a Quiz!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
