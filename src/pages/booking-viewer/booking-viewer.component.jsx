import React from 'react';
import axios from 'axios';
import Barcode from 'react-barcode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import BookingViewerTable from '../../components/booking-viewer-table/booking-viewer-table.component';
import BookingViewerHistory from '../../components/booking-viewer-history/booking-viewer-history.component';
import LoadingScreen from '../../components/loading-screen/loading-screen.component';
import getIdFromPathname from '../../utils/getIdFromPathname';

import './booking-viewer.styles.scss';

class BookingViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingId: getIdFromPathname(this.props.history.location.pathname),
            isBookingError: false,
            bookingData: null,
            bookingDataLoadComplete: false,
        };
    }

    async componentDidMount() {
        const { bookingId } = this.state;

        if (bookingId) {
            try {
                const bookingData = await axios({
                    url: `/api/bookings/mapped-booking/${bookingId}`,
                    method: 'GET',
                });

                this.setState({
                    bookingData: bookingData.data.data.data,
                    bookingDataLoadComplete: true,
                });
            } catch (error) {
                this.setState({ isBookingError: true });
            }
        } else {
            this.props.history.push('/myAccount/order');
        }
    }

    refreshHistory = async () => {
        try {
            const refreshedData = await axios({
                method: 'GET',
                url: `/api/bookings/mapped-booking/${this.state.bookingId}`,
            });

            if (
                this.state.bookingData.history.length !==
                refreshedData.data.data.data.history.length
            ) {
                this.setState({
                    bookingData: refreshedData.data.data.data,
                });
            }

            console.log(refreshedData);
        } catch (error) {
            console.log('err');
        }
    };

    render() {
        const { bookingData, bookingDataLoadComplete } = this.state;
        return (
            <div className="booking-viewer">
                {!bookingDataLoadComplete && (
                    <LoadingScreen>Wczytywanie zamówienia...</LoadingScreen>
                )}
                <div className="booking-viewer-container">
                    <div className="booking-viewer-header">
                        <span
                            className="back-btn"
                            onClick={() => {
                                this.props.history.push('/myAccount/orders');
                            }}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </span>
                        <h2>Szczegóły zamówienia:</h2>
                    </div>
                    {bookingDataLoadComplete && (
                        <BookingViewerTable
                            products={{
                                pizzas: bookingData.pizzas,
                                ownPizzas: bookingData.ownPizzas,
                                sauces: bookingData.sauces,
                                drinks: bookingData.drinks,
                            }}
                            price={bookingData.price}
                            isFinished={bookingData.isFinished}
                        />
                    )}
                    {bookingDataLoadComplete && (
                        <div className="booking-viewer-details">
                            <h4>
                                Płatność:&nbsp;
                                <span>
                                    {bookingData.isPayNow
                                        ? 'Z góry'
                                        : 'Przy odbiorze'}
                                </span>
                            </h4>
                            <h4>
                                Rodzaj zamówienia:&nbsp;
                                <span>
                                    {bookingData.isTakeAway
                                        ? 'Na wynos'
                                        : 'Na miejscu'}
                                </span>
                            </h4>
                            {bookingData.address && (
                                <div className="booking-viewer-address">
                                    <h4>Dostawa na adres:</h4>
                                    <p>
                                        ul.&nbsp;
                                        {bookingData.address.street}&nbsp;
                                        {bookingData.address.houseNumber}
                                        {bookingData.address.flatNumber &&
                                            `/${bookingData.address.flatNumber}`}
                                    </p>
                                    <p>
                                        {bookingData.address.zipCode}&nbsp;
                                        {bookingData.address.city}
                                    </p>
                                    <p>
                                        tel.&nbsp;
                                        {bookingData.address.phoneNumber}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                    {bookingDataLoadComplete && (
                        <div className="booking-viewer-description">
                            <Barcode value={bookingData.barcode} />
                        </div>
                    )}

                    {bookingDataLoadComplete && (
                        <BookingViewerHistory
                            history={bookingData.history}
                            refresh={this.refreshHistory}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default BookingViewer;
