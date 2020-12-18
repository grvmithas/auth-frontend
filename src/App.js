
import React from 'react'
import ErrorBoundry from './components/error-boundry/ErrorBoundry'
import Router from './router'

function App() {
  return (
    <div className="App">
      <ErrorBoundry>
        <Router/>
      </ErrorBoundry>
    </div>
  )
}

export default App
