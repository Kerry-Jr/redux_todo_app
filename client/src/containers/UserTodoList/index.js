import React, {Component} from 'react';
import { reduxForm, Field } from "redux-form";
import { Header, Form, Segment, Message, List, Pagination } from "semantic-ui-react";
import { connect } from 'react-redux';
import { compose } from 'redux';




class UserTodoList extends Component {

    renderAddTodo = ({ input, meta }) => {
        return (
            <Form.Input
                {...input}
                error={meta.touched && meta.error}
                autoComplete='off'
                placeholder=''
            />
        )
    }

    render() {
        return (
            <>
                <Header as='h2' color='teal' textAlign='center' content='Welcome to the todo app'/>
                <Form size='large'>
                    <Segment stacked>
                        <Field
                            name='text'
                            component={this.renderAddTodo}

                        />
                    </Segment>

                </Form>
            </>
                

        );
    }
}

export default reduxForm({ form: 'Add todo '})(UserTodoList);