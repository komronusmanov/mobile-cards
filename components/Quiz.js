import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { resetQuiz } from '../actions'
import { Entypo } from '@expo/vector-icons'
import Card from './Card'

class Quiz extends Component {
  render() {

    const { navigate, state } = this.props.navigation
    const { dispatch, correct, questionIndex, decks } = this.props
    const { deck } = state.params
    const { questions, title } = decks[deck]

    if (questions.length > 0 && questionIndex == questions.length) {
      const count = parseInt(correct * 100/ questions.length)
      return (
        <View style={styles.container}>
          <Entypo style={styles.icon} name='emoji-flirt' size={150}/>
          <Text style={styles.congrats}>Congrats! You have got {count}% answers!</Text>
          <TouchableOpacity style={styles.resetQuiz} onPress={() => dispatch(resetQuiz())}>
            <Text style={styles.btnTxt}>Reset Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backToDeck} onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.btnTxt}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.questionIndex}>{questionIndex+1}/{questions.length}</Text>
        <Card question={questions[questionIndex]} />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: '#cce6ff',
    justifyContent: 'center',
  },
  resetQuiz: {
    alignSelf: 'center',
    width: 200,
    padding: 5,
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: '#e60000'
  },
  backToDeck: {
    alignSelf: 'center',
    width: 200,
    padding: 5,
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: '#3399ff',
  },
  btnTxt: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  congrats: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    fontSize: 25,
    fontWeight: 'bold',
  },
  questionIndex: {
    textAlign: 'center',
    fontSize: 20,
  }
})

function mapStateToProps (state) {
  return {
    correct: state.answers.correct,
    questionIndex: state.answers.questionIndex,
    decks: state.decks,
  }
}

export default connect(mapStateToProps)(Quiz)
