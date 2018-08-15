import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'

class DeckList extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    getDecks()
    .then((decks) => dispatch(receiveDecks(decks)))
  }

  _keyExtractor = (item, index) => item

  render() {

    const { decks } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          data={Object.keys(decks)}
          extraData={this.state}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          />
      </View>
    )
  }

  _renderItem = ({ item }) => {
    const { title, questions } = this.props.decks[item]
    const { navigate } = this.props.navigation
    return (
      <View>
        <TouchableOpacity style={styles.decks} onPress={() => {
        navigate('Deck', {deckId: item, title: title, questions: questions})}}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={styles.deckInfo}>{questions.length} Questions</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3399ff',
    paddingTop: 22,
  },
  decks: {
    backgroundColor: '#cce6ff',
    flex: 1,
    padding: 10,
    margin: 20,
    borderRadius: 10,
  },
  deckTitle: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  deckInfo: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00264d',
  }
})

function mapStateToProps ({ decks }) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)
