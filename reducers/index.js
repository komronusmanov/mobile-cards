import { combineReducers } from 'redux'
import { RECEIVE_DECKS, ADD_QUESTION, ADD_DECK, ANSWER_QUESTION, START_QUIZ, RESET_QUIZ } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_QUESTION :
      state[action.key].questions.push(action.question)
      return {
        ...state
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.deck
      }
    default :
      return state
  }
}

const initialState = {correct: 0, questionIndex: 0, startQuiz: false}

function answers (state = initialState, action) {
  switch (action.type) {
    case ANSWER_QUESTION :
      action.correct ? state.correct += 1 : state.correct
      state.questionIndex += 1
      return {
        ...state
      }
    case START_QUIZ :
      return {
        ...state, startQuiz: true
      }
    case RESET_QUIZ :
      return { ...initialState }
    default :
      return {
        ...state
      }
  }
}

const reducer = combineReducers({ decks, answers })
export default reducer
