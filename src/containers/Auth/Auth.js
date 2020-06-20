import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Classes from './Auth.module.css';
import * as actionCreators from '../../store/actions/index';
import { connect } from 'react-redux';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                },
                isValid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                validation: {
                    required: true,
                },
                isValid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    inputChangedHadler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                isValid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }

         this.setState({ controls: updatedControls });
    }

    checkValidity(value, rules) {
        let isValid = true;
        
        if (!rules) {
            return isValid;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;

    }

    orderHandler = (event) => {
        event.preventDefault();
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        const isSignUp = this.state.isSignUp;
        this.props.onAuthSubmit(email, password, isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState({ isSignUp: !this.state.isSignUp })
    }

    render () {
        const formElementArray = [];
        for(let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form =(
                    <form onSubmit={this.orderHandler}>
                        {
                            formElementArray.map(formElement => (
                                <Input  key={formElement.id}
                                        elementType={formElement.config.elementType} 
                                        elementConfig={formElement.config.elementConfig}  
                                        changed={(event) => this.inputChangedHadler(event, formElement.id)}
                                        invalid={!formElement.config.isValid}
                                        touched={formElement.config.touched}
                                        shouldValidate={formElement.config.validation}
                                        value={formElement.config.value}/>
                            ))
                        }
                        <Button btnType="Success"> {this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</Button>
                    </form>
                ); 
        return(
            <div className={Classes.Auth}>
                {form}
                <Button
                    clicked={this.switchAuthModeHandler} 
                    btnType="Danger">
                      SWITCH TO  {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'} 
                    </Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthSubmit: (email, password, isSignUp) => dispatch(actionCreators.auth(email, password, isSignUp))
    }
}

export default connect(null, mapDispatchToProps)(Auth);