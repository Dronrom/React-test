import React, {Component} from 'react';
import ErrorIndicator from '../error-indicator/error-indicator';


export default class ErrorBoundry extends Component {
        state = {
            hasError: false
        }
        
        componentDidCatch(){
            this.setState({
                hasError: true
            })
        }
    
        render() {
            if(this.setState.hasError){
                return <ErrorIndicator/>
            }
            return this.props.children;
        }
}