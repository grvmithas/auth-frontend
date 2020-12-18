import React from 'react'
import PropTypes from 'prop-types'

class ErrorBoundry extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError:false
    }
  }

  static getDerivedStateFromError(error) {
    if(error){
      return {
        hasError: true
      } }
    return null
  }

  componentDidCatch(error,info) {
    console.log('exception occurred!!', 'ERROR-', error, 'INFO-',info)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong... Reload Page</h1>
    }
    return this.props.children 
  }
}


ErrorBoundry.propTypes ={
  children:PropTypes.node
}
ErrorBoundry.defaultProps={
  Children:null
}
export default ErrorBoundry