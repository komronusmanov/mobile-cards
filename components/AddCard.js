import React, { Component } from 'react'
import { KeyboardAvoidingView, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addNewCard } from '../utils/api'
import { addQuestion } from '../actions'

class AddCard extends Component {

  state = {
    question: '',
    answer: '',
  }

  addCard = () => {
    const { question, answer } = this.state
    const { dispatch, navigation } = this.props
    const { deck } = navigation.state.params

    if(question !== '' && answer !== '') {
      const card = { question, answer }
      addNewCard(card, deck)
        .then((results) => {
          dispatch(addQuestion(deck, card))
          navigation.goBack()
        })
    }
  }

  render() {
    const { navigate, state } = this.props.navigation
    const { deck } = state.params
    const { question, answer } = this.state

    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.header}>Please Add a New Question:</Text>
        <TextInput
          value={question}
          style={styles.input}
          onChangeText={(question) => this.setState({question})}
          onSubmit={this.addCard}
          placeholder="Please enter a question."
          underlineColorAndroid='transparent'/>
        <Text style={styles.header}>Current Question's Answer:</Text>
        <TextInput
          value={answer}
          style={styles.input}
          onChangeText={(answer) => this.setState({answer})}
          onSubmit={this.addCard}
          placeholder="Here goes the answer..."
          underlineColorAndroid='transparent'/>
        <TouchableOpacity style={styles.button} onPress={() => this.addCard()}>
          <Text style={styles.buttonTxt}>Add Card</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cce6ff',
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    textAlign: 'center',
    height: 50,
    width: 300,
    borderRadius: 10,
    fontSize: 20,
    marginTop: 15,
    backgroundColor: 'white',
  },
  button: {
    width: 200,
    padding: 5,
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: '#3399ff',
  },
  buttonTxt: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold'
  }
})

export default connect()(AddCard)
