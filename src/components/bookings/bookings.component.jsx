import React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

import LoadingScreen from '../loading-screen/loading-screen.component';
import BookingsListItem from '../bookings-list-item/bookings-list-item.component';

import './bookings.styles.scss';

class Bookings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            isLoadingBookings: true,
        };
    }

    async componentDidMount() {
        try {
            let bookingsList = await axios({
                method: 'GET',
                url: '/api/bookings',
            });

            if (bookingsList.data.results > 0) {
                this.setState({
                    bookings: bookingsList.data.data.data,
                    isLoadingBookings: false,
                });
            }
        } catch (error) {
            this.setState({
                isLoadingBookings: false,
            });
        }
    }

    openDetails = (id) => this.props.history.push(`/myAccount/orders/${id}`);

    render() {
        const bookingsCount = this.state.bookings.length;
        return (
            <div className="bookings-container">
                {this.state.isLoadingBookings && (
                    <LoadingScreen>Wczytywanie zamówień</LoadingScreen>
                )}
                {bookingsCount === 0 && (
                    <p>Nie złożyłeś jeszcze żadnego zamówienia</p>
                )}
                {bookingsCount > 1 && <h1>Moje zamówienia:</h1>}
                <div className="bookings-list-wrapper">
                    {this.state.bookings.map((booking, num) => (
                        <BookingsListItem
                            bookingData={booking}
                            key={booking._id}
                            additionalClass={
                                num % 2 === 0 ? 'bookings-list-item-grey' : null
                            }
                            details={this.openDetails}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default withRouter(Bookings);
