import React, { createRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import './settings.styles.scss';

class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
            nameInput: '',
            surnameInput: '',
            emailInput: '',
            phoneNoInput: '',
            isLoadedPhoto: false,
            currentUser:
                JSON.parse(localStorage.getItem('currentUser')) || null,
        };
        this.fileRef = createRef();
        this.photoForm = createRef();
        this.photoRef = createRef();
    }

    componentDidMount() {
        if (this.state.currentUser) {
            const { name, email } = this.state.currentUser;
            this.setState({
                nameInput: name,
                emailInput: email,
            });
        }
    }

    openFileDialog = async () => {
        const file = this.fileRef.current;

        if (!this.state.isLoadedPhoto) {
            file.click();
        } else {
            if (file.files[0]) {
                const formData = new FormData();
                formData.append('coverPhoto', file.files[0]);

                await this.sendUserChanges(formData, {
                    'Content-Type': 'multipart/form-data',
                });

                file.value = null;
            }
        }
    };

    sendUserChanges = async (data, headers) => {
        let user = await axios({
            method: 'PATCH',
            url: `/api/users/updateMe`,
            data,
            headers,
        });

        if (user) {
            user = user.data.data.data;
            this.setState(
                {
                    currentUser: user,
                    isLoadedPhoto: false,
                },
                () => {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            );
        }
    };

    photoHandler = (event) => {
        event.preventDefault();
        const { files } = event.target;

        const isLoadedPhoto = event.target.files.length > 0 ? true : false;
        this.setState({ isLoadedPhoto });
    };

    inputHandler = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    resetPhoto = async (event) => {
        event.preventDefault();
        const { isLoadedPhoto, currentUser } = this.state;
        if (isLoadedPhoto) {
            this.fileRef.current.value = null;
            this.photoRef.current.src = `/uploads/users/${
                currentUser.photo ? currentUser.photo : 'default.png'
            }`;
            this.setState({
                isLoadedPhoto: false,
            });
        } else {
            await this.sendUserChanges({ photo: 'default.png' }, {});
        }
    };

    render() {
        const { currentUser } = this.state;
        return (
            <div>
                <div className="user-photo-container">
                    <img
                        src={`/uploads/users/${
                            currentUser.photo
                                ? currentUser.photo
                                : 'default.png'
                        }`}
                        alt=""
                        ref={this.photoRef}
                    />
                    <div className="user-photo-buttons-wrapper">
                        <span
                            className="save-btn"
                            onClick={this.openFileDialog}
                        >
                            {this.state.isLoadedPhoto ? 'Zapisz' : 'Zmień'}
                        </span>
                        <span
                            className="save-btn trash-btn"
                            onClick={this.resetPhoto}
                        >
                            {this.state.isLoadedPhoto ? (
                                'Reset'
                            ) : (
                                <FontAwesomeIcon icon={faTrashAlt} />
                            )}
                        </span>
                    </div>
                </div>
                <form
                    className="photo-form"
                    ref={this.photoForm}
                    encType="multipart/form-data"
                >
                    <input
                        type="file"
                        ref={this.fileRef}
                        onChange={this.photoHandler}
                        hidden
                    />
                </form>
                <form className="user-data-form">
                    <div className="user-input-wrapper">
                        <label>Imię:</label>
                        <input
                            type="text"
                            className="user-input"
                            value={this.state.nameInput}
                            onChange={this.inputHandler}
                            name="nameInput"
                        />
                    </div>
                    <div className="user-input-wrapper">
                        <label>Email:</label>
                        <input
                            type="text"
                            className="user-input"
                            value={this.state.emailInput}
                            onChange={this.inputHandler}
                            name="emailInput"
                        />
                    </div>
                    <button className="save-btn">Zapisz zmiany</button>
                </form>
            </div>
        );
    }
}

export default Settings;
