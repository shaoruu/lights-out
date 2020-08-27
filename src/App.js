import React from 'react'
import './App.scss'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Lights Out</h1>
      </header>
      <main className="App-main">
        <div className="game">
          <div className="row">
            <div className="cell" id="0-0"></div>
            <div className="cell" id="0-1"></div>
            <div className="cell" id="0-2"></div>
          </div>
          <div className="row">
            <div className="cell" id="1-0"></div>
            <div className="cell" id="1-1"></div>
            <div className="cell" id="1-2"></div>
          </div>
          <div className="row">
            <div className="cell" id="2-0"></div>
            <div className="cell" id="2-1"></div>
            <div className="cell" id="2-2"></div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
