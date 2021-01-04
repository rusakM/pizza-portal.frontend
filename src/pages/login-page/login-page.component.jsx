import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import './login-page.styles.scss';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerPage: false,
        };
    }

    render() {
        const loginBtnClass = this.state.registerPage ? '' : 'active';
        const registerBtnClass = this.state.registerPage ? 'active' : '';
        return (
            <div className="login-page">
                <div className="login-page-container">
                    <div className="login-page-screens">
                        <div className="login-page-buttons">
                            <span
                                className={loginBtnClass}
                                onClick={() => {
                                    this.setState({
                                        registerPage: false,
                                    });
                                }}
                            >
                                Logowanie
                            </span>
                            <span
                                className={registerBtnClass}
                                onClick={() => {
                                    this.setState({
                                        registerPage: true,
                                    });
                                }}
                            >
                                Rejestracja
                            </span>
                        </div>
                        {this.state.registerPage ? (
                            <SignUp />
                        ) : (
                            <SignIn login={this.props.login} />
                        )}
                    </div>
                </div>
                <div
                    className="login-page-background"
                    style={{
                        backgroundImage: `url('/img/login-page/background.jpg')`,
                    }}
                ></div>
            </div>
        );
    }
}

export default LoginPage;
