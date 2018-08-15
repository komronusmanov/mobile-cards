import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { answerQuestion } from '../actions'
import { FontAwesome } from '@expo/vector-icons'

class Card extends Component {

  state = {
    show: 'Answer'
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0)
    this.value = 0
    this.animatedValue.addListener(({ value }) => {
      this.value = value
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    })
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
  }

  reset() {
    if (this.value >= 90) {
      Animated.parallel([
        Animated.timing(this.animatedValue, {
          toValue: 0,
          duration: 0
        }),
      ]).start()
      this.setState({show: 'Answer'})
    }
  }

  flipCard() {
    if(this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start()
      this.setState({show: 'Answer'})
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start()
      this.setState({show: 'Question'})
    }
  }

  render() {

    const { dispatch } = this.props
    const { question, answer } = this.props.question
    const { show } = this.state

    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    return (
      <View>
        <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
          <FontAwesome style={styles.icons} name='question-circle-o' size={150}/>
          <Text style={styles.card}>{question}</Text>
        </Animated.View>
        <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
          <FontAwesome style={styles.icons} name='exclamation' size={150}/>
          <Text style={styles.answer}>{answer}</Text>
        </Animated.View>
        <TouchableOpacity style={styles.showBtn} onPress={() => this.flipCard()}>
          <Text style={styles.showBtnTxt}>{show}</Text>
        </TouchableOpacity>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.correct} onPress={() => {dispatch(answerQuestion(true)), this.reset()}}>
            <Text style={styles.correctTxt}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.incorrect} onPress={() => {dispatch(answerQuestion(false)), this.reset()}}>
            <Text style={styles.incorrectTxt}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icons: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  card: {
    alignSelf: 'center',
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  flipCard: {
    width: 300,
    height: 375,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    backfaceVisibility: 'visible',
  },
  flipCardBack: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
  },
  answer: {
    alignSelf: 'center',
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  showBtn: {
    alignSelf: 'center',
    width: 200,
    padding: 5,
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: '#3399ff',
  },
  showBtnTxt: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  correct: {
    width: 150,
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: '#47d147',
  },
  correctTxt: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  incorrect: {
    width: 150,
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: '#e60000',
  },
  incorrectTxt: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  }
})

export default connect()(Card)
