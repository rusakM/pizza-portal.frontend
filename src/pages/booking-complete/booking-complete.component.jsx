import React from 'react';
import axios from 'axios';

import UserButton from '../../components/user-button/user-button.component';
import LoadingScreen from '../../components/loading-screen/loading-screen.component';

import './booking-complete.styles.scss';

class BookingComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingId:
                this.props.history.location.pathname.split('/')[2] || null,
            isLoading: true,
        };
    }

    async componentDidMount() {
        const { bookingId } = this.state;
        if (bookingId) {
            try {
                let booking = await axios({
                    method: 'GET',
                    url: `/api/bookings/${bookingId}`,
                });
                booking = booking.data.data.data;
                if (!booking.paid && booking.isPayNow) {
                    await axios({
                        method: 'PATCH',
                        url: `/api/bookings/${bookingId}`,
                        data: {
                            paid: true,
                        },
                    });
                } else if (booking.paid) {
                    this.props.history.push('/myAccount/orders');
                }
                this.setState({ isLoading: false });
            } catch (error) {}
        }
    }

    render() {
        return (
            <div className="booking-complete">
                {this.state.isLoading && (
                    <LoadingScreen>
                        Finalizacja zamówienia...
                        <br />
                        Nie zamykaj okna przeglądarki
                    </LoadingScreen>
                )}
                <div className="booking-complete-container">
                    <h1>Zamówienie zostało złożone...</h1>
                    <p>Sprawdź jego status klikając w przycisk poniżej</p>
                    <UserButton
                        onClick={() => {
                            this.props.history.push(
                                `/myAccount/orders/${this.state.bookingId}`
                            );
                        }}
                    >
                        Sprawdź
                    </UserButton>
                </div>
            </div>
        );
    }
}

export default BookingComplete;
