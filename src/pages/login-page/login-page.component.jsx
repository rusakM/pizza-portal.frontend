import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import LoadingScreen from '../../components/loading-screen/loading-screen.component';
import './login-page.styles.scss';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerPage: false,
            isLoadingData: false,
        };
    }

    toggleLoadingScreen = () => {
        this.setState({
            isLoadingData: !this.state.isLoadingData,
        });
    };

    render() {
        const loginBtnClass = this.state.registerPage ? '' : 'active';
        const registerBtnClass = this.state.registerPage ? 'active' : '';
        return (
            <div className="login-page">
                {this.state.isLoadingData && (
                    <LoadingScreen>Logowanie...</LoadingScreen>
                )}
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
                            <SignUp
                                signup={this.props.signup}
                                toggleLoadingScreen={this.toggleLoadingScreen}
                            />
                        ) : (
                            <SignIn
                                login={this.props.login}
                                toggleLoadingScreen={this.toggleLoadingScreen}
                            />
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
