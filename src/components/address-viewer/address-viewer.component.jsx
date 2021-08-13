import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import AddressCard from '../address-card/address-card.component';
import UserButton from '../user-button/user-button.component';
import EMPTY_ADDRESS from '../../utils/emptyAddress';
import './address-viewer.styles.scss';

class AddressViewer extends React.Component {
    constructor() {
        super();

        this.state = {
            addresses: [],
            isCreatingAddress: false,
        };
    }

    async componentDidMount() {
        try {
            let addresses = await axios({
                url: '/api/users/getMyAddress',
                method: 'GET',
            });

            addresses = addresses.data.data.data;
            this.setState({ addresses });
        } catch (error) {}
    }

    toggleCreatingAddress = () =>
        this.setState({ isCreatingAddress: !this.state.isCreatingAddress });

    removeAddress = async (id, num) => {
        try {
            await axios({
                url: `/api/address/${id}`,
                method: 'DELETE',
            });
            const { addresses } = this.state;
            addresses.splice(num, 1);
            this.setState({ addresses });
        } catch (error) {}
    };

    cancelAddress = () => {
        this.toggleCreatingAddress();
    };

    updateAddress = async (addressData, id, num) => {
        try {
            let address = await axios({
                url: `/api/address/${id}`,
                method: 'PATCH',
                data: addressData,
            });
            address = address.data.data.data;
            const { addresses } = this.state;
            addresses[num] = address;
            this.setState({ addresses });
        } catch (error) {}
    };

    setAsDefault = async (id, num) => {
        try {
            let address = await axios({
                url: `/api/address/${id}`,
                method: 'PATCH',
                data: {
                    isDefault: true,
                },
            });
            address = address.data.data.data;
            const { addresses } = this.state;
            for (let i = 0; i < addresses.length; i++) {
                addresses[i].isDefault = false;
            }
            addresses[num] = address;
            this.setState({ addresses });
        } catch (error) {}
    };

    createAddress = async (addressData) => {
        try {
            let address = await axios({
                url: '/api/address',
                method: 'POST',
                data: addressData,
            });
            address = address.data.data.data;
            const { addresses } = this.state;
            addresses.push(address);
            this.setState({
                addresses,
                isCreatingAddress: false,
            });
        } catch (error) {
            console.log(error);
        }
    };

    showError = () => {};

    render() {
        const { isCreatingAddress } = this.state;
        return (
            <div className="address-viewer">
                <h1>Twoje adresy:</h1>
                <div className="addresses-wrapper">
                    {isCreatingAddress ? (
                        <AddressCard
                            address={EMPTY_ADDRESS}
                            cancel={this.cancelAddress}
                            save={this.createAddress}
                            isEditing={true}
                        />
                    ) : (
                        <UserButton
                            onClick={this.toggleCreatingAddress}
                            additionalClass="address-new"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            &nbsp;Dodaj adres
                        </UserButton>
                    )}
                    <div className="addresses-container">
                        {this.state.addresses.map((address, i) => (
                            <AddressCard
                                address={address}
                                remove={this.removeAddress}
                                cancel={this.cancelAddress}
                                save={this.updateAddress}
                                setDefault={this.setAsDefault}
                                num={i}
                                key={i}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default AddressViewer;
