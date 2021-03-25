import React, { createRef } from 'react';
import axios from 'axios';

import UserInput from '../user-input/user-input.component';
import UserButton from '../user-button/user-button.component';

import './change-password.styles.scss';

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            passwordCurrent: '',
            passwordConfirm: '',
            currentUser:
                JSON.parse(localStorage.getItem('currentUser')) || null,
        };

        this.formRef = createRef();
    }

    inputHandler = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    };

    submitHandler = async (event) => {
        event.preventDefault();
        const { password, passwordConfirm, passwordCurrent } = this.state;
        let user = await axios({
            method: 'PATCH',
            url: '/api/users/updateMyPassword',
            data: {
                passwordCurrent,
                password,
                passwordConfirm,
            },
        });

        if (user) {
            user = user.data.data.data;
            this.setState(
                {
                    currentUser: user,
                },
                () => {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    event.target.reset();
                }
            );
        }
    };

    arePasswordsSame = () => {
        const { password, passwordConfirm } = this.state;
        return password === passwordConfirm;
    };

    validatePassword = () => {
        const { password } = this.state;
        const reg = new RegExp(/^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/gi);
        return reg.test(password);
    };

    render() {
        return (
            <div className="account-container">
                <div className="password-header">
                    <h1>Zmień swoje hasło:</h1>
                </div>
                <div className="password-form-wrapper">
                    <form ref={this.formRef}>
                        <UserInput
                            type="password"
                            name="passwordCurrent"
                            value={this.state.passwordCurrent}
                            onChange={this.inputHandler}
                            autocomplete="new-password"
                        >
                            Hasło:
                        </UserInput>
                        <UserInput
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.inputHandler}
                            autocomplete="new-password"
                        >
                            Nowe hasło:
                        </UserInput>
                        <UserInput
                            type="password"
                            name="passwordConfirm"
                            value={this.state.passwordConfirm}
                            onChange={this.inputHandler}
                            autocomplete="new-password"
                        >
                            Powtórz hasło:
                        </UserInput>
                        <UserButton onClick={() => this.formRef.current.send()}>
                            Zmień hasło
                        </UserButton>
                    </form>
                </div>
            </div>
        );
    }
}

export default ChangePassword;
