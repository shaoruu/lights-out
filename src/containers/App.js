import './App.scss'
import logo from './logo.svg'

import React, { useEffect, useState } from 'react'
import { Matrix, PrimeField } from 'gauss-jordan'

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
const colors = ['#393b44', '#d6e0f0', '#8d93ab']

const getCellColor = (number) => colors[number % modulus]

// black = 0
// white = 1
// gray = 2

function App() {
  const [state, setState] = useState([
    // 0,
    // 0,
    // 0,
    // 0,
    // 0,
    // 0,
    // 0,
    // 0,
    // 0
    // 0,
    // 0,
    // 1,
    // 2,
    // 2,
    // 1,
    // 0,
    // 1,
    // 2
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
  const [restart, setRestart] = useState(false)

  const handleClick = (pairs) => {
    setState((state) => {
      const cloneState = JSON.parse(JSON.stringify(state))
      pairs.forEach(([i, j]) => {
        cloneState[i * modulus + j] = ++cloneState[i * modulus + j] % 3
      })

      return cloneState
    })
  }

  const handleRules = (cell) => {
    switch (cell) {
      case '00':
        handleClick([
          [0, 0],
          [0, 1],
          [1, 0],
          [1, 1]
        ])
        break
      case '01':
        handleClick([
          [0, 0],
          [0, 1],
          [0, 2]
        ])
        break
      case '02':
        handleClick([
          [0, 1],
          [0, 2],
          [1, 1],
          [1, 2]
        ])
        break
      case '10':
        handleClick([
          [0, 0],
          [1, 0],
          [2, 0]
        ])
        break
      case '11':
        handleClick([
          [0, 1],
          [1, 0],
          [1, 1],
          [1, 2],
          [2, 1]
        ])
        break
      case '12':
        handleClick([
          [0, 2],
          [1, 2],
          [2, 2]
        ])
        break
      case '20':
        handleClick([
          [1, 0],
          [1, 1],
          [2, 0],
          [2, 1]
        ])
        break
      case '21':
        handleClick([
          [2, 0],
          [2, 1],
          [2, 2]
        ])
        break
      case '22':
        handleClick([
          [1, 1],
          [1, 2],
          [2, 1],
          [2, 2]
        ])
        break
      default:
        break
    }
  }

  const augmented = rules.map((row, i) => row.concat(state[i]))
  const matrix = new Matrix(
    augmented.length,
    augmented[0].length,
    new PrimeField(modulus)
  )

  for (let i = 0; i < augmented.length; i++) {
    for (let j = 0; j < augmented[i].length; j++)
      matrix.set(i, j, augmented[i][j])
  }

  const answer = matrix
    .reducedRowEchelonForm()
    .map((row) => row[row.length - 1] * 2)

  useEffect(() => {
    const mapped = []
    answer.forEach((n, i) => n && mapped.push(...new Array(n).fill(i)))

    let counter = 0
    const interval = setInterval(() => {
      handleRules(`${Math.floor(mapped[counter] / 3)}${mapped[counter] % 3}`)
      counter++

      if (counter === mapped.length) {
        setRestart(true)
        clearInterval(interval)
      }
    }, 200)
  }, [restart])

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
              onClick={() => restart && handleRules('00')}
              style={{ backgroundColor: getCellColor(state[0]) }}
            ></div>
            <div
              className="cell"
              id="0-1"
              onClick={() => restart && handleRules('01')}
              style={{ backgroundColor: getCellColor(state[1]) }}
            ></div>
            <div
              className="cell"
              id="0-2"
              onClick={() => restart && handleRules('02')}
              style={{ backgroundColor: getCellColor(state[2]) }}
            ></div>
          </div>
          <div className="row">
            <div
              className="cell"
              id="1-0"
              onClick={() => restart && handleRules('10')}
              style={{ backgroundColor: getCellColor(state[3]) }}
            ></div>
            <div
              className="cell"
              id="1-1"
              onClick={() => restart && handleRules('11')}
              style={{ backgroundColor: getCellColor(state[4]) }}
            ></div>
            <div
              className="cell"
              id="1-2"
              onClick={() => restart && handleRules('12')}
              style={{ backgroundColor: getCellColor(state[5]) }}
            ></div>
          </div>
          <div className="row">
            <div
              className="cell"
              id="2-0"
              onClick={() => restart && handleRules('20')}
              style={{ backgroundColor: getCellColor(state[6]) }}
            ></div>
            <div
              className="cell"
              id="2-1"
              onClick={() => restart && handleRules('21')}
              style={{ backgroundColor: getCellColor(state[7]) }}
            ></div>
            <div
              className="cell"
              id="2-2"
              onClick={() => restart && handleRules('22')}
              style={{ backgroundColor: getCellColor(state[8]) }}
            ></div>
          </div>
        </div>
      </main>
      <footer className="App-footer">
        <span className="run-again" onClick={() => setRestart(false)}>
          run again?
        </span>
        <br />
        Answer:
        <span>{answer.map((a) => a / 2)}</span>
      </footer>
    </div>
  )
}

export default App
