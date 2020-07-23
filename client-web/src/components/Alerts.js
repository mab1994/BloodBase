import React from 'react'
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux'

const Alerts = props => {
    return (
        props.alert.length > 0 && props.alert.map(alert => (
            <Alert key={alert.id} severity={alert.type} variant={alert.fillness}>
                {alert.msg}
            </Alert>
        ))

    )
}

const mapStateToProps = state => {
    return {
        alert: state.alert
    }
}

export default connect(mapStateToProps)(Alerts)