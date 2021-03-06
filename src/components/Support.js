import React from 'react'
import {connect} from 'react-redux'

import Loader from './Extras/Loader'

class Support extends React.PureComponent {
  render() {
    const {loading} = this.props.support
    // console.log('Support.js',loading)
    return (
      <React.Fragment>
        <Loader key="Loader" isLoading={loading} />
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    support: state.support,
  }
}
export default connect(mapStateToProps, null)(Support)
