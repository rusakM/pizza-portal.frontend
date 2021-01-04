import React from 'react';

import './pizza-viewer-photo.styles.scss';

const PizzaViewerPhoto = ({ coverPhoto }) => (
    <div className="pizza-viewer-photo-container">
        <img src={`/uploads/pizzas/${coverPhoto}`} alt={coverPhoto} />
    </div>
);

export default PizzaViewerPhoto;
