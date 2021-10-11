document.addEventListener('DOMContentLoaded', () => {
    /* eslint-disable max-nested-callbacks*/
    function calculate() {
        let radioCost = 20;

        const calcText = document.querySelectorAll('.text_state_calculate');
        const subBtn = document.querySelectorAll('.btn_substract');
        const addBtn = document.querySelectorAll('.btn_add');
        const ticketsList = document.querySelector('.tickets__info');
        const cost = [
            ['Permanent exhibition', 20],
            ['Temporary exhibition', 25],
            ['Combined Admission', 40],
        ];

        localStorage.setItem('cost', JSON.stringify(cost));

        if (localStorage.getItem('checkedCost')) {
            setInputValueAfterReloading();
            setRadioButtonAfterReloading();
            recost();
            recountAmountInForm();
        } else {
            localStorage.setItem('checkedCost', radioCost);
        }

        function setRadioButtonAfterReloading() {
            const radioBtns = document.querySelectorAll('input[name="ticketCost"]');
            const storageCost = JSON.parse(localStorage.getItem('checkedCost'));
            const matchCost = cost.find((el) => el[1] === storageCost)[1];

            radioBtns.forEach((el) => {

                if (+el.value === matchCost) {
                    el.setAttribute('checked', true);
                } else {
                    el.checked = false;
                }
            });
        }

        function setInputValueAfterReloading() {
            const basicInputs = document.querySelectorAll('input[name="amountBasic"]');
            const seniorInputs = document.querySelectorAll('input[name="amountSenior"]');

            basicInputs.forEach((el) => {
                el.value = +localStorage.getItem('basic');
            });

            seniorInputs.forEach((el) => {
                el.value = +localStorage.getItem('senior');
            });
        }

        ticketsList.addEventListener('click', (event) => {
            if (event.target.tagName === 'SPAN') {
                const ticketTypeText = document.querySelector('.text_ticketType');
                const select = document.querySelector('.popup-tickets__input-select');
                radioCost = getCostFromRadio(event);
                localStorage.setItem('checkedCost', radioCost);
                let findTypeText;

                cost.forEach((el) => {
                    if (+el[1] === radioCost) {
                        findTypeText = el[0];
                        Array.from(select.children).forEach((option) => {
                            option.removeAttribute('selected');
                            if (option.textContent === findTypeText) {
                                option.selected = 'selected';
                            }
                        });
                    }
                });

                ticketTypeText.textContent = findTypeText;

                recost();
                recountAmountInForm();
            }
        });

        function getCostFromRadio(event) {
            return cost.find((type) => event.target.textContent === type[0])[1];
        }

        function addAndSubstract() {
            subBtn.forEach((btn) => {
                let count;
                btn.addEventListener('click', (event) => {
                    let inputs;

                    if (event.target.dataset.person === 'basic') {
                        inputs = document.querySelectorAll('input[name="amountBasic"]');
                    } else {
                        inputs = document.querySelectorAll('input[name="amountSenior"]');
                    }

                    inputs.forEach((inp) => {
                        inp.stepDown();

                        if (inp.getAttribute('name') === 'amountBasic') {
                            localStorage.setItem('basic', inp.value);
                        } else {
                            localStorage.setItem('senior', inp.value);
                        }
                    });

                    recountAmountInForm();

                    if (count !== 0) {
                        calcText.forEach((txt) => {

                            if (btn.nextElementSibling.getAttribute('name') === 'amountBasic') {

                                if (txt.textContent <= 20) {
                                    txt.textContent = 0;
                                } else {
                                    txt.textContent -= radioCost;
                                }
                            } else {
                                if (txt.textContent <= 10) {
                                    txt.textContent = 0;
                                } else {
                                    txt.textContent -= radioCost / 2;
                                }
                            }
                        });
                    }
                    count = +btn.nextElementSibling.value;
                });
            });

            addBtn.forEach((btn) => {
                let count = 0;
                btn.addEventListener('click', (event) => {
                    let inputs;

                    if (event.target.dataset.person === 'basic') {
                        inputs = document.querySelectorAll('input[name="amountBasic"]');
                    } else {
                        inputs = document.querySelectorAll('input[name="amountSenior"]');
                    }

                    inputs.forEach((inp) => {
                        inp.stepUp();

                        if (inp.getAttribute('name') === 'amountBasic') {
                            localStorage.setItem('basic', inp.value);
                        } else {
                            localStorage.setItem('senior', inp.value);
                        }
                    });

                    recountAmountInForm();

                    if (count !== 20) {
                        calcText.forEach((txt) => {

                            if (btn.previousElementSibling.getAttribute('name') === 'amountBasic') {
                                if (btn.previousElementSibling.value < 21) {
                                    txt.textContent = +txt.textContent + radioCost;
                                }
                            } else {
                                if (btn.previousElementSibling.value < 21) {
                                    txt.textContent = +txt.textContent + radioCost / 2;
                                }
                            }
                        });
                    }

                    count = +btn.previousElementSibling.value;
                });
            });
        }

        function recost(isLocal) {
            const basicCount = document.querySelectorAll('input[name="amountBasic"]')[1].value;
            const seniorCount = document.querySelectorAll('input[name="amountSenior"]')[1].value;

            if (isLocal) {
                const storageCost = JSON.parse(localStorage.getItem('checkedCost'));
                calcText.forEach((txt) => {
                    txt.textContent = basicCount * storageCost + seniorCount * storageCost / 2;
                });
            } else {
                calcText.forEach((txt) => {
                    txt.textContent = basicCount * radioCost + seniorCount * radioCost / 2;
                });
            }
        }

        function recountAmountInForm(isLocal) {
            const basicCount = document.querySelectorAll('input[name="amountBasic"]')[1].value;
            const seniorCount = document.querySelectorAll('input[name="amountSenior"]')[1].value;

            const basicSpanCount = document.querySelectorAll('.popup-tickets__requisites-amount.text_size_sm')[0];
            const seniorSpanCount = document.querySelectorAll('.popup-tickets__requisites-amount.text_size_sm')[1];

            const basicTextAmount = basicSpanCount.nextElementSibling;
            const seniorTextAmount = seniorSpanCount.nextElementSibling;

            const basicCostTotal = document.querySelectorAll('.popup-tickets__requisites-textTotal')[0];
            const seniorCostTotal = document.querySelectorAll('.popup-tickets__requisites-textTotal')[1];

            basicSpanCount.textContent = basicCount;
            seniorSpanCount.textContent = seniorCount;

            if (isLocal) {
                radioCost = JSON.parse(localStorage.getItem('checkedCost'));
            }

            const basicTextInForm = document.querySelectorAll('span.popup-tickets__text.text.text_cost_changable')[0];
            const seniorTextInForm = document.querySelectorAll('span.popup-tickets__text.text.text_cost_changable')[1];

            basicTextInForm.textContent = `Basic (${radioCost} €)`;
            seniorTextInForm.textContent = `Senior (${radioCost / 2} €)`;

            basicTextAmount.textContent = `Basic (${radioCost} €)`;
            seniorTextAmount.textContent = `Senior (${radioCost / 2} €)`;

            basicCostTotal.textContent = `${basicCount * radioCost} €`;
            seniorCostTotal.textContent = `${seniorCount * radioCost / 2} €`;
        }

        function setCorrectDate() {
            const date = document.querySelector('.popup-tickets__input-date');
            let now = new Date();
            date.min = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

            date.addEventListener('blur', () => {
                const dateText = document.querySelector('.text_ticketDate');
                let val = new Date(date.value).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });

                if (val === 'Invalid Date') {
                    dateText.textContent = now.toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });
                } else {
                    dateText.textContent = val;
                }
            });
        }

        function setCorrectTime() {
            const time = document.querySelector('.popup-tickets__input-time');
            const timeText = document.querySelector('.text_ticketTime');
            time.addEventListener('blur', () => {
                timeText.textContent = time.value;
            });
        }

        function setSelectedValueToTicketType() {
            const select = document.querySelector('.popup-tickets__input-select');

            select.addEventListener('blur', () => {
                const ticketTypeText = document.querySelector('.text_ticketType');

                Array.from(select.children).forEach((el) => {
                    if (el.value === select.value) {
                        ticketTypeText.textContent = el.textContent;

                        const radioBtns = document.querySelectorAll('input[type="radio"]');

                        radioBtns.forEach((radio) => {
                            const txt = radio.nextElementSibling.nextElementSibling;

                            if (txt.textContent === ticketTypeText.textContent) {
                                radio.checked = 'checked';
                            }
                        });

                        radioCost = getCostFromSelect(el);
                        localStorage.setItem('checkedCost', radioCost);
                        recost();
                        recountAmountInForm();
                    }
                });

            });
        }

        function getCostFromSelect(txt) {
            return cost.find((el) => el[0] === txt.textContent)[1];
        }

        function scrollMonth() {
            const up = document.querySelectorAll('.paymentCard-controls__arrow-up');
            const down = document.querySelectorAll('.paymentCard-controls__arrow-down');
            const monthInput = document.querySelector('.input_month');

            up.forEach((el) => {
                el.addEventListener('click', () => {
                    const input = el.parentElement.previousElementSibling;

                    if (input === monthInput && input.value < 9) {
                        input.value = `0${+input.value + 1}`;
                    } else {
                        if ((input.value <= 11 && input === monthInput) || input !== monthInput) {
                            input.value = `${+input.value + 1}`;
                        }
                    }
                });
            });

            down.forEach((el) => {
                el.addEventListener('click', () => {
                    const input = el.parentElement.previousElementSibling;

                    if ((input.value < 11 && +input.value > 1) && input === monthInput) {
                        input.value = `0${+input.value - 1}`;
                    } else {

                        if (+input.value !== 1) {
                            input.stepDown();

                        }
                    }
                });
            });
        }

        addAndSubstract();
        scrollMonth();
        setCorrectDate();
        setCorrectTime();
        setSelectedValueToTicketType();
        recost(true);
        recountAmountInForm(true);
    }

    calculate();
});
