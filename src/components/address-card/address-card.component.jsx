import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEdit,
    faTrashAlt,
    faSave,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';

import UserButton from '../user-button/user-button.component';
import AddressInput from '../address-input/address-input.component';
import AddressCardValidator from '../../utils/address-card.validator';

import './address-card.styles.scss';

class AddressCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: props.isEditing || false,
            city: props.address.city || '',
            street: props.address.street || '',
            zipCode: props.address.zipCode || '',
            houseNumber: props.address.houseNumber || '',
            flatNumber: props.address.flatNumber || '',
            phoneNumber: props.address.phoneNumber || '',
            isDefault: props.address.isDefault ? true : false,
        };

        this.initialState = this.state;
    }

    static getDerivedStateFromProps(props, state) {
        if (props.address.isDefault !== state.isDefault) {
            return {
                isDefault: props.address.isDefault,
            };
        }
        return null;
    }

    changeHandler = (event) => {
        const { name, value, classList } = event.target;
        const validator = AddressCardValidator.validators[name];

        if (validator) {
            if (!validator.test(value) && value) {
                classList.add('invalid-input');
            } else {
                classList.remove('invalid-input');
            }
        }

        this.setState({
            [name]: value,
        });
    };

    toggleEdit = () => {
        this.setState({ isEditing: !this.state.isEditing });
    };

    resetForm = () => {
        this.setState(this.initialState);
        if (!this.props.address._id) {
            this.props.cancel();
        }
    };

    getChanges = () => {
        const fieldsFromState = {
            city: this.state.city,
            zipCode: this.state.zipCode,
            street: this.state.street,
            houseNumber: this.state.houseNumber,
            phoneNumber: this.state.phoneNumber,
            isDefault: this.state.isDefault,
        };

        if (this.state.flatNumber) {
            fieldsFromState.flatNumber = this.state.flatNumber;
        }

        if (!this.props.address._id) {
            return fieldsFromState;
        }

        const changes = {};

        Object.keys(fieldsFromState).forEach((key) => {
            if (fieldsFromState[key] !== this.initialState[key]) {
                changes[key] = fieldsFromState[key];
            }
        });

        return changes;
    };

    render() {
        const {
            city,
            zipCode,
            street,
            houseNumber,
            flatNumber,
            phoneNumber,
            isEditing,
        } = this.state;
        const { _id } = this.props.address;
        const { num } = this.props;
        let inputClasses = 'address-input';
        if (isEditing) {
            inputClasses += ' address-input-active';
        }
        return (
            <div className="address-card">
                <form
                    className={
                        this.state.isDefault || isEditing
                            ? 'address-default'
                            : ''
                    }
                >
                    {isEditing && <h2>Nowy adres:</h2>}
                    <div className="address-card-row">
                        <AddressInput
                            classes={inputClasses}
                            name="street"
                            value={street}
                            onChange={this.changeHandler}
                            placeholder="Ulica:"
                            disabled={!isEditing}
                        />

                        <AddressInput
                            classes={`${inputClasses}`}
                            name="houseNumber"
                            value={houseNumber}
                            onChange={this.changeHandler}
                            placeholder="Nr domu:"
                            disabled={!isEditing}
                        />
                        {(isEditing || flatNumber) && (
                            <AddressInput
                                classes={inputClasses}
                                name="flatNumber"
                                value={flatNumber}
                                onChange={this.changeHandler}
                                placeholder="Nr mieszkania:"
                                disabled={!isEditing}
                            />
                        )}
                    </div>
                    <div className="address-card-row">
                        <AddressInput
                            classes={inputClasses}
                            name="zipCode"
                            value={zipCode}
                            onChange={this.changeHandler}
                            placeholder="Kod pocztowy:"
                            disabled={!isEditing}
                        />
                        <AddressInput
                            classes={inputClasses}
                            name="city"
                            value={city}
                            onChange={this.changeHandler}
                            placeholder="Miejscowość:"
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="address-card-row">
                        <AddressInput
                            classes={inputClasses}
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={this.changeHandler}
                            placeholder="Numer telefonu:"
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="address-card-row address-card-row-wrap">
                        {isEditing && (
                            <UserButton
                                onClick={async () => {
                                    const changes = this.getChanges();
                                    if (
                                        AddressCardValidator.validateBeforeSave(
                                            changes
                                        )
                                    ) {
                                        await this.props.save(
                                            changes,
                                            _id,
                                            num
                                        );
                                    }
                                }}
                                additionalClass="address-button"
                            >
                                <FontAwesomeIcon icon={faSave} />
                                &nbsp;Zapisz
                            </UserButton>
                        )}
                        {isEditing && (
                            <UserButton
                                onClick={this.resetForm}
                                additionalClass="address-button"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                                &nbsp;Anuluj
                            </UserButton>
                        )}
                        {!isEditing && (
                            <UserButton
                                onClick={this.toggleEdit}
                                additionalClass="address-button"
                            >
                                <FontAwesomeIcon icon={faEdit} />
                                &nbsp;Edytuj
                            </UserButton>
                        )}
                        {!isEditing && (
                            <UserButton
                                onClick={() => this.props.remove(_id, num)}
                                additionalClass="address-button"
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                                &nbsp;Kasuj
                            </UserButton>
                        )}
                        {!isEditing && !this.state.isDefault && (
                            <UserButton
                                additionalClass="address-button"
                                onClick={() => {
                                    this.props.setDefault(_id, num);
                                }}
                            >
                                Ustaw jako domyślny
                            </UserButton>
                        )}
                    </div>
                </form>
            </div>
        );
    }
}

export default AddressCard;
