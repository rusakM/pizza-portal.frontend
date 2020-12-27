import React from 'react';
import { uploadsUrl } from '../../config';

import './pizza-viewer-photo.styles.scss';

const PizzaViewerPhoto = ({ coverPhoto }) => (
    <div className="pizza-viewer-photo-container">
        <img src={`${uploadsUrl}/pizzas/${coverPhoto}`} alt={coverPhoto} />
    </div>
);

export default PizzaViewerPhoto;
