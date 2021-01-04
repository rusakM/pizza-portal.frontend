import React, { createRef } from 'react';

import axios from 'axios';
import { apiUrl } from '../../config';

import './landing-page.styles.scss';

class LandingPage extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            phoneNumber: '',
            subject: '',
            message: '',
        };
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, email, phoneNumber, subject, message } = this.state;
        axios({
            method: 'POST',
            url: `/api/messages`,
            data: {
                name,
                email,
                phoneNumber,
                subject,
                message,
            },
        }).then((response) => {
            this.popupRef.current.style.display = 'flex';
        });
    };

    popupRef = createRef();

    render() {
        return (
            <div>
                <section className="home">
                    <div className="home-container">
                        <div className="home-left"></div>
                        <div
                            className="home-right"
                            style={{
                                backgroundImage: `url('img/landing-page/background.jpg')`,
                            }}
                        ></div>
                        <div className="slogan-container">
                            <h1 className="slogan">PIZZA</h1>
                            <h1 className="slogan">PORTAL</h1>
                            <h2 className="slogan-description">
                                NAJLEPSZA PIZZA W MIEŚCIE!
                            </h2>
                        </div>
                        <span className="home-btn">ZAMÓW PIZZĘ ONLINE</span>
                    </div>
                </section>
                <section className="menu-hot">
                    <div className="menu-container">
                        <div className="menu-left">
                            <h2 className="section-description">MENU HOT!</h2>
                        </div>
                        <div
                            className="menu-right"
                            style={{
                                backgroundImage: `url('img/landing-page/pizza2.jpg')`,
                            }}
                        ></div>
                    </div>
                    <div className="menu-hot-items-container">
                        <div className="menu-card-item">
                            <div className="menu-card-photo-container">
                                <img
                                    src="img/landing-page/capriciosa.png"
                                    alt=""
                                    className="menu-card-photo"
                                />
                            </div>
                            <h3>CAPRICIOSA</h3>
                            <p className="menu-card-description">
                                Ser, szynka, pieczarki, oliwki
                            </p>
                        </div>
                        <div className="menu-card-item">
                            <div className="menu-card-photo-container">
                                <img
                                    src="img/landing-page/pollo.png"
                                    alt=""
                                    className="menu-card-photo"
                                />
                            </div>
                            <h3>POLLO</h3>
                            <p className="menu-card-description">
                                Ser, szynka, cebula, pomidorki koktajlowe
                            </p>
                        </div>
                        <div className="menu-card-item">
                            <div className="menu-card-photo-container">
                                <img
                                    src="img/landing-page/havai.png"
                                    alt=""
                                    className="menu-card-photo"
                                />
                            </div>
                            <h3>HAVAI</h3>
                            <p className="menu-card-description">
                                Ser, szynka, ananas, pieczarki
                            </p>
                        </div>
                    </div>
                </section>
                <section className="about" id="about">
                    <div className="about-left">
                        <img
                            src="img/landing-page/pizza1.jpg"
                            alt=""
                            className="section-img"
                        />
                    </div>
                    <div className="about-right">
                        <h2 className="section-description">O NAS</h2>
                        <p className="about-description">
                            Sieć Pizza Portal funkcjonuje na rynku od końca lat
                            90. W międzyczasie wielokrotnie była nagradzana
                            przez Konsumentów, za pyszne jedzenie, atmosferę,
                            świetną obsługę. Przez lata skupiliśmy się na
                            sprzedaży pizzy przez internet, abyś mógł wygodnie
                            zamówić pizzę z wyprzedzeniem i przyjść do nas
                            odbierając już gotowe zamówienie.
                        </p>
                        <p className="about-description">
                            Naszą misją jest dostarczanie najlepszego jedzenia –
                            tak, jak lubisz, tam, gdzie chcesz i wtedy, kiedy
                            chcesz. W tym celu rozwijamy nasze kompetencje i
                            możliwości tak, aby móc serwować najlepsze jedzenie
                            i dostarczać je wszędzie tam, gdzie nasi przyjaciele
                            go potrzebują.
                        </p>
                    </div>
                </section>
                <section className="contact" id="contact">
                    <div className="contact-container">
                        <div className="contact-left">
                            <img
                                src="img/landing-page/cook.png"
                                alt=""
                                className="contact-img"
                            />
                        </div>
                        <div className="contact-right">
                            <h2 className="section-description">Kontakt</h2>
                            <form
                                className="contact-form"
                                onSubmit={this.handleSubmit}
                            >
                                <label htmlFor="name">Imię</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="contact-input"
                                    onChange={this.handleChange}
                                    value={this.state.name}
                                    required
                                />
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="contact-input"
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                    required
                                />
                                <label htmlFor="phoneNumber">Telefon</label>
                                <input
                                    type="text"
                                    className="contact-input"
                                    name="phoneNumber"
                                    onChange={this.handleChange}
                                    value={this.state.phoneNumber}
                                />
                                <label htmlFor="subject">Temat</label>
                                <input
                                    type="text"
                                    name="subject"
                                    className="contact-input"
                                    onChange={this.handleChange}
                                    value={this.state.subject}
                                />
                                <label htmlFor="message">Wiadomość</label>
                                <textarea
                                    name="message"
                                    required
                                    onChange={this.handleChange}
                                >
                                    {this.state.message}
                                </textarea>
                                <button className="btn">Wyślij</button>
                            </form>
                        </div>
                    </div>
                </section>
                <aside className="form-popup" ref={this.popupRef}>
                    <div className="form-popup-container">
                        <p className="form-popup-message">
                            Wiadomość została wysłana
                        </p>
                        <span
                            className="form-popup-confirm-btn btn"
                            onClick={() => {
                                this.popupRef.current.style.display = 'none';
                            }}
                        >
                            OK
                        </span>
                    </div>
                </aside>
            </div>
        );
    }
}

export default LandingPage;
