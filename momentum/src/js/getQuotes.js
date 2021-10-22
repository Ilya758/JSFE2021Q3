/* eslint-disable no-undef */
export default () => {
    const changeQuoteBtn = document.querySelector('.icon-change-quote');
    const quote = document.querySelector('.footer__quote');
    const author = document.querySelector('.footer__author');

    changeQuoteBtn.onclick = () => getQuotes();

    async function getQuotes() {
        const quotes = './js/quotes/quotes-rus.json';
        const response = await fetch(quotes);
        const data = await response.json();
        const randomNumOfQuote = Math.floor((Math.random() * data.length));

        quote.textContent = `"${getContext(data, randomNumOfQuote, 'quote')}"`;
        author.textContent = getContext(data, randomNumOfQuote, 'author');
    }

    function getContext(data, number, elem) {
        return data[number][elem];
    }

    getQuotes();
};
