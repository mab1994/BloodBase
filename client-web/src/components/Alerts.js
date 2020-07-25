import React from 'react'
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const Alerts = ({ alerts }) =>
    alerts !== null && alerts.length > 0 && alerts.map(al => (
        <Alert key={al.id} variant={al.fillness} severity={al.type}>{al.msg}</Alert>
    ))

Alert.PropTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => {
    return {
        alerts: state.alert
    }
}

export default connect(mapStateToProps)(Alerts)