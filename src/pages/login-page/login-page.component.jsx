import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import LoadingScreen from '../../components/loading-screen/loading-screen.component';
import AlertBasic from '../../components/alert-basic/alert-basic.component';
import './login-page.styles.scss';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerPage: false,
            isLoadingData: false,
            isErrorVisible: false,
            errorMessage: '',
        };
    }

    toggleLoadingScreen = () => {
        this.setState({
            isLoadingData: !this.state.isLoadingData,
        });
    };

    showError = (screen) => {
        this.setState({
            isErrorVisible: true,
            errorMessage:
                screen === 'login'
                    ? 'Nie udało się zalogować, spróbuj ponownie'
                    : 'Błąd podczas rejestracji, spróbuj ponownie',
            isLoadingData: false,
        });
    };

    closeError = () => {
        this.setState({
            isLoadingData: false,
            isErrorVisible: false,
            errorMessage: '',
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
                                showError={this.showError}
                            />
                        ) : (
                            <SignIn
                                login={this.props.login}
                                toggleLoadingScreen={this.toggleLoadingScreen}
                                showError={this.showError}
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
                {this.state.isErrorVisible && (
                    <AlertBasic buttonTxt="Ok" confirmAction={this.closeError}>
                        {this.state.errorMessage}
                    </AlertBasic>
                )}
            </div>
        );
    }
}

export default LoginPage;
