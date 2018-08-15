import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert } from 'react-native'
import { addDeck } from '../actions'
import { saveNewDeck } from '../utils/api'
import { connect } from 'react-redux'

class AddDeck extends Component {

  state = {
    text: ''
  }

 onSubmit = () => {
   const { text } = this.state
   const deck = {
     [text]: {
       title: text,
       questions: []
     }
   }

   if( text === '' ) {
     return Alert.alert('Oops!','Looks like you have not finished form!')
   }

   
   saveNewDeck(deck)
    .then(() => {
      this.setState({text: ''})
      this.props.dispatch(addDeck(deck))
      this.props.navigation.navigate('DeckList')
      this.props.navigation.navigate('Deck', {deckId: text, title: text})
    })
 }

  render() {
    const { text } = this.state

    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Text style={styles.header}>Please Enter Title for a New Deck:</Text>
        <TextInput
          value={text}
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          onSubmit={this.onSubmit}
          placeholder="New Deck's Name"
          underlineColorAndroid='transparent'/>
        <TouchableOpacity style={styles.button} onPress={() => this.onSubmit()}>
          <Text style={styles.buttonTxt}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3399ff',
    paddingTop: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    textAlign: 'center',
    height: 100,
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
    backgroundColor: '#cce6ff',
  },
  buttonTxt: {
    fontSize: 30,
    alignSelf: 'center',
    color: '#00264d',
    fontWeight: 'bold',
  }
})

export default connect()(AddDeck)
