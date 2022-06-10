import React from 'react';
import axios from 'axios';
import { useState } from 'react/cjs/react.production.min';

import MainBody from './recom/common/MainBody';

const Recommender = () => {

    const url = 'https://berkaycumbur.pythonanywhere.com/getrandom'


    axios.get(url)
        .then(response => {
            console.log(response)
        })

    return (
        <>
            <MainBody></MainBody>
        </>
    );
}

export default Recommender;
