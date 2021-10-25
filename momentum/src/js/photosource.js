/* eslint-disable no-undef */

import greeting from './greeting';

export default async (src) => {
    const query = greeting();
    let preUrl, postUrl, key, url, response, data;

    if (src === 'unsplash') {
        preUrl = 'https://api.unsplash.com/photos/random?orientation=landscape&query=';
        key = '&client_id=NhzepGPSFB4OD5WD7qRNoCm1HM0cg-yqkP9h54wRtXk';
        url = `${preUrl}${query}${key}`;
        response = await fetch(url);
        data = await response.json();
        const img = createImage(data, 'unsplash');

        img.onload = () => {
            document.body.style.background = `url(${data.urls.full}) 0/cover`;
        };
    } else {
        preUrl = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=';
        key = '6bf9d377824659884ff77ad110d2057e';
        postUrl = '&extras=url_l&format=json&nojsoncallback=1';
        url = `${preUrl}${key}&tags=${query}${postUrl}`;
        response = await fetch(url);
        data = await response.json();
        const img = createImage(data);
        img.onload = () => {
            document.body.style.background = `url(${img.src}) 0/cover`;
        };
    }

    function createImage(url, flag) {
        const img = new Image();

        if (flag === 'unsplash') {
            img.src = url.urls.full;
        } else {
            img.src = url.photos.photo[Math.floor(Math.random() * 100)].url_l;
        }

        return img;
    }
};
