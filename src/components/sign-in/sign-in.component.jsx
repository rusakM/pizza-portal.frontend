import React from 'react';

import LoginInput from '../login-input/login-input.component';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.login(email, password);
    };

    render() {
        return (
            <div className="sign-in">
                <h2>Zaloguj się:</h2>
                <form onSubmit={this.handleSubmit}>
                    <LoginInput
                        handleChange={this.handleChange}
                        label="Email"
                        name="email"
                        required
                        value={this.state.email}
                        type="email"
                    />
                    <LoginInput
                        handleChange={this.handleChange}
                        label="Hasło"
                        name="password"
                        required
                        value={this.state.password}
                        type="password"
                    />
                    <LoginInput
                        type="submit"
                        value="Zaloguj"
                        className="login-btn"
                    />
                </form>
            </div>
        );
    }
}

export default SignIn;
