import React from 'react';
import LoginInput from '../login-input/login-input.component';
import '../sign-in/sign-in.styles.scss';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            passwordConfirm: '',
        };
    }

    handleChamge = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        this.props.toggleLoadingScreen();
        this.props.signup(this.state, this.props.showError);
    };

    render() {
        return (
            <div className="sign-up">
                <h2>Zarejestruj się:</h2>
                <form onSubmit={this.handleSubmit}>
                    <LoginInput
                        handleChange={this.handleChamge}
                        label="Email"
                        name="email"
                        required
                        value={this.state.email}
                        type="email"
                    />
                    <LoginInput
                        handleChange={this.handleChamge}
                        label="Imię i nazwisko"
                        name="name"
                        required
                        value={this.state.name}
                        type="text"
                    />
                    <LoginInput
                        handleChange={this.handleChamge}
                        label="Hasło (min 8 znaków)"
                        name="password"
                        required
                        value={this.state.password}
                        type="password"
                    />
                    <LoginInput
                        handleChange={this.handleChamge}
                        label="Powtórz hasło"
                        name="passwordConfirm"
                        required
                        value={this.state.passwordConfirm}
                        type="password"
                    />
                    <LoginInput
                        type="submit"
                        value="Zarejestruj"
                        className="login-btn"
                    />
                </form>
            </div>
        );
    }
}

export default SignUp;
