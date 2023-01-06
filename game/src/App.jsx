import React from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import Timer from './components/Timer'


function App() {
  const [dice, setDice] = React.useState(allNewDice())

  const [tenzies, setTenzies] = React.useState(false)

  const [tries, setTries] = React.useState(0)

  const [reset, setReset] = React.useState(false)



  function checkHeld() {
    const allHeld = []
    dice.map(die => {
      if (die.isHeld) {
        allHeld.push(die)
      }
    })
    if (allHeld.length < dice.length) {
      return false
    }
    else {
      return true
    }
  }

  function checkValue() {
    const allEqual = arr => arr.every(v => v === arr[0])
    const diceValues = []
    dice.map(die => {
      diceValues.push(die.value)
    })
    return allEqual(diceValues)
  }

  React.useEffect(() => {
    if (checkHeld() && checkValue()) {
      setTenzies(true)
    }

  }, [dice])

  function allNewDice() {
    const array = []
    for (let i = 0; i < 10; i++) {
      let random = Math.floor((Math.random() * 6) + 1)
      array.push({
        value: random,
        isHeld: false,
        id: nanoid()
      })
    }
    return array
  }

  function rollDice() {
    if (tenzies) {
      setDice(allNewDice())
      setTries(0)
      setTenzies(false)
      setReset(true)
    }
    else {
      setDice(prev => prev.map(die => {
        let rdm = Math.floor((Math.random() * 6) + 1)
        return die.isHeld ? die : { ...die, value: rdm }
      }))
      setTries(prevTries => prevTries + 1)
    }
  }

  function holdDice(id) {
    setDice(prev => prev.map(obj => {
      if (obj.id === id) {
        return { ...obj, isHeld: !obj.isHeld }
      }
      else {
        return obj
      }
    }))
  }

  const dieElement = dice.map(die => <Die value={die.value} isHeld={die.isHeld} key={die.id} hold={() => holdDice(die.id)} />)




  return (
    <div className="App">
      <div className="container">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same.
          Click each die to freeze it at its current value between rolls.
        </p>
        <div className="tries">
          <p>number of rolls: {tries}</p>
        </div>

        <div className='grid'>
          {dieElement}
        </div>
        <div className='Roll' onClick={rollDice}>
          <button>{tenzies ? "Play again" : "Roll"}</button>
        </div>
        <Timer tenzies={tenzies} reset={reset} setReset={setReset} />


        {tenzies && <Confetti
          width="320px"
          height="320px" />}
      </div>
      
      <div className="credits">
        
        <p>Made By<a href="https://github.com/saboujid"> Saboujid</a></p>

      </div>
    </div >
  )
}

export default App
