import './App.scss'
import logo from './logo.svg'

import { useTimeout } from 'react-use'
import React, { useState } from 'react'
import rref from 'rref'

const rules = [
  [1, 1, 0, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 1, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 1, 0, 0, 0],
  [1, 0, 0, 1, 1, 0, 1, 0, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 1, 0, 1, 1, 0, 0, 1],
  [0, 0, 0, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 1, 1, 1],
  [0, 0, 0, 0, 0, 1, 0, 1, 1]
]

const modulus = 3
const colors = ['#d6e0f0', '#8d93ab', '#393b44']

const getCellColor = (number) => colors[number % modulus]

function App() {
  const [state, setState] = useState([
    Math.floor(Math.random() * modulus),
    Math.floor(Math.random() * modulus),
    Math.floor(Math.random() * modulus),
    Math.floor(Math.random() * modulus),
    Math.floor(Math.random() * modulus),
    Math.floor(Math.random() * modulus),
    Math.floor(Math.random() * modulus),
    Math.floor(Math.random() * modulus),
    Math.floor(Math.random() * modulus)
  ])

  console.log(rules.map((row, i) => row.concat(state[i])))
  const answers = rref(rules.map((row, i) => row.concat(state[i])))
  console.log(answers)

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo-container">
          <img src={logo} alt="lightbulb" className="App-logo" />
        </div>
        <h1>Lights Out</h1>
      </header>
      <main className="App-main">
        <div className="game">
          <div className="row">
            <div
              className="cell"
              id="0-0"
              style={{ backgroundColor: getCellColor(state[0]) }}
            ></div>
            <div
              className="cell"
              id="0-1"
              style={{ backgroundColor: getCellColor(state[1]) }}
            ></div>
            <div
              className="cell"
              id="0-2"
              style={{ backgroundColor: getCellColor(state[2]) }}
            ></div>
          </div>
          <div className="row">
            <div
              className="cell"
              id="1-0"
              style={{ backgroundColor: getCellColor(state[3]) }}
            ></div>
            <div
              className="cell"
              id="1-1"
              style={{ backgroundColor: getCellColor(state[4]) }}
            ></div>
            <div
              className="cell"
              id="1-2"
              style={{ backgroundColor: getCellColor(state[5]) }}
            ></div>
          </div>
          <div className="row">
            <div
              className="cell"
              id="2-0"
              style={{ backgroundColor: getCellColor(state[6]) }}
            ></div>
            <div
              className="cell"
              id="2-1"
              style={{ backgroundColor: getCellColor(state[7]) }}
            ></div>
            <div
              className="cell"
              id="2-2"
              style={{ backgroundColor: getCellColor(state[8]) }}
            ></div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
