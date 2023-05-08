import React from 'react'
import ReactDOM from 'react-dom'
import WeatherCard from './WeatherCard'

import './popup.css'

const App: React.FC<{}> = () => {

  return (
    <div>
      <WeatherCard city='meerut' />
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
