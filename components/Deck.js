import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Navigator } from 'react-native'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons'
import { resetQuiz } from '../actions'

class Deck extends Component {

  render() {
    const { navigate, state } = this.props.navigation
    const { deckId } = state.params
    const { dispatch, decks } = this.props
    const { questions, title } = decks[deckId]

    return (
      <View style={styles.container}>
        <View style={styles.deckInfo}>
          <Entypo name='documents' size={150}/>
          <Text style={styles.header}>{title}</Text>
          <Text style={styles.cards}>{questions.length} Cards</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => this.props.navigation.navigate('AddCard', {deck: deckId}) }>
          <Text style={styles.addBtnTxt}>Add Card</Text>
          </TouchableOpacity>
          {questions.length > 0 && (
            <TouchableOpacity
              style={styles.quizButton}
              onPress={() => {
                this.props.dispatch(resetQuiz())
                this.props.navigation.navigate('Quiz', {deck: deckId})
              }}>
              <Text style={styles.quizBtnTxt}>Start Quiz</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: '#cce6ff',
  },
  deckInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  cards: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  addButton: {
    width: 200,
    padding: 5,
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: '#3399ff',
  },
  addBtnTxt: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  quizButton: {
    width: 200,
    padding: 5,
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: '#47d147',
  },
  quizBtnTxt: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  }
})


function mapStateToProps ( { decks } ) {
  return { decks }
}

export default connect(mapStateToProps)(Deck)
