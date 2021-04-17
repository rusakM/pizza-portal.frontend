import React, { createRef } from 'react';
import axios from 'axios';

import UserInput from '../user-input/user-input.component';
import UserButton from '../user-button/user-button.component';
import AlertBasic from '../alert-basic/alert-basic.component';

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
            alertMsg: null,
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
        if (!passwordCurrent || !passwordConfirm || !passwordCurrent) {
            return;
        }
        if (!this.validatePassword()) {
            await this.setAlert(
                'Podaj hasło składające się z minimum 8 znaków. Dodatkowo hasło musi zawierać przynajmniej jedną cyfrę.'
            );

            return;
        }
        if (!this.arePasswordsSame()) {
            await this.setAlert('Podane hasła nie są takie same');
            return;
        }

        try {
            let user = await axios({
                method: 'PATCH',
                url: '/api/users/updateMyPassword',
                data: {
                    passwordCurrent,
                    password,
                    passwordConfirm,
                },
            });

            user = user.data.data.user;
            this.setState(
                {
                    currentUser: user,
                    alertMsg: 'Hasło zostało zmienione',
                    password: '',
                    passwordConfirm: '',
                    passwordCurrent: '',
                },
                () => {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            );
        } catch (error) {
            this.setAlert(error.response.data.message);
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

    closeAlert = () => {
        this.setState({
            alertMsg: null,
        });
    };

    setAlert = async (message) => {
        await this.setState({ alertMsg: message });
    };

    render() {
        const { alertMsg } = this.state;
        return (
            <div className="account-container">
                <div className="password-header">
                    <h1>Zmień swoje hasło:</h1>
                </div>
                <div className="password-form-wrapper">
                    <form ref={this.formRef} onSubmit={this.submitHandler}>
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
                        <UserButton onClick={this.submitHandler}>
                            Zmień hasło
                        </UserButton>
                    </form>
                    {alertMsg ? (
                        <AlertBasic
                            buttonTxt="Ok"
                            confirmAction={this.closeAlert}
                        >
                            {alertMsg}
                        </AlertBasic>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default ChangePassword;
