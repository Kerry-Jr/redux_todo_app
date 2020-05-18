import React, {Component} from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Form, Segment, Button} from "semantic-ui-react";
import { email, required } from "redux-form-validators";
import { AUTH_USER, AUTH_USER_ERROR } from "../../actions/types";
import axios from 'axios';

class SignIn extends Component {

       onSubmit = async (formValues, dispatch) => {
        try {
            const { data } = await axios.post('/api/auth/signin', formValues);
            console.log(data);
            localStorage.setItem('token', data.token);
            dispatch({ type: AUTH_USER, payload: data.token });
            this.props.history.push('/counter');
        } catch (e) {
            dispatch({ type: AUTH_USER_ERROR, payload: e });
        }
    }

    renderEmail = ({ input, meta }) => {
        return (
            <Form.Input
                {...input}
                fluid
                error={ meta.touched && meta.error }
                icon='user'
                iconPosition='left'
                autoComplete='off'
                placeholder='Email address'
            />
        )
    }
    renderPassword = ({ input, meta }) => {
        return (
            <Form.Input
                {...input}
                type='password'
                fluid
                error={ meta.touched && meta.error }
                icon='lock'
                iconPosition='left'
                autoComplete='off'
                placeholder='password'
            />
        )
    }
    render() {
        const { handleSubmit, invalid, submitting, submitFailed } = this.props;
        return (
            <Form size='large' onSubmit={handleSubmit(this.onSubmit)} >
                <Segment stacked>
                    <Field
                        name='email'
                        component={this.renderEmail}
                        validate={
                            [
                                required({ msg: 'Email is required' }),
                                email({ msg: 'You must provide a valid email address' })
                            ]
                        }
                    />
                    <Field
                        name='password'
                        component={this.renderPassword}
                        validate={
                            [
                                required({ msg: 'You must provide a password' })
                            ]
                        }
                    />
                    <Button
                        content='Sign In'
                        color='teal'
                        fluid
                        size='large'
                        type='submit'
                        disbaled={ invalid || submitting || submitFailed }
                    />
                </Segment>
            </Form>
        )
    }
}

export default reduxForm({form: 'SignIn'})(SignIn);