document.addEventListener('DOMContentLoaded', () => {
    function validate() {
        let isClicked = false;
        const name = document.querySelector('.popup-tickets__input-name');
        const email = document.querySelector('.popup-tickets__input-email');
        const phone = document.querySelector('.popup-tickets__input-phone');
        const form = document.querySelector('.popup-tickets__form');

        [
            [name, validateName],
            [email, validateEmail],
            [phone, validatePhone],
        ].forEach((el) => el[0].addEventListener('blur', () => {
            el[1]();
        }));


        function validateName() {
            const regName = /^[\D\s]{3,13}$/gi;
            const valName = name.value;
            const text = name.nextElementSibling;

            if (regName.test(valName)) {
                name.classList.remove('input_state_invalid');
                text.classList.remove('text_state_invalid');
            } else {
                name.classList.add('input_state_invalid');
                text.classList.add('text_state_invalid');
            }
        }

        function validateEmail() {
            const regEmail = /^[a-zA-Z]{3}[\d\w]{0,12}@[a-z]{4,}.[a-zA-Z]{2,}$/gi;
            const valEmail = email.value;
            const text = email.nextElementSibling;

            if (regEmail.test(valEmail)) {
                email.classList.remove('input_state_invalid');
                text.classList.remove('text_state_invalid');
            } else {
                email.classList.add('input_state_invalid');
                text.classList.add('text_state_invalid');
            }
        }

        function validatePhone() {
            const regPhones = [
                /([\d]{2}[\s|-]{1}[\d]{2}[\s|-]{1}[\d]{2}[\s|-]{1}[\d]{2}[\s|-]{1}[\d]{2})$/g,
                /^([\d]{2}[\s|-]{1}[\d]{3}[\s|-]{1}[\d]{2}[\s|-]{1}[\d]{3})$/g,
                /^([\d]{2}[\s|-]{1}[\d]{2}[\s|-]{1}[\d]{3}[\s|-]{1}[\d]{3})$/g,
                /^([\d]{3}[\s|-]{1}[\d]{3}[\s|-]{1}[\d]{2}[\s|-]{1}[\d]{2})$/g,
                /^([\d]{2}[\s|-]{1}[\d]{3}[\s|-]{1}[\d]{3}[\s|-]{1}[\d]{2})$/g,
                /^([\d]{3}[\s|-]{1}[\d]{2}[\s|-]{1}[\d]{3}[\s|-]{1}[\d]{2})$/g,
                /^([\d]{3}[\s|-]{1}[\d]{2}[\s|-]{1}[\d]{2}[\s|-]{1}[\d]{3})$/g,
                /^(\d){10}$/
            ];
            const valPhone = phone.value;
            const text = phone.nextElementSibling;

            if (regPhones.filter((reg) => valPhone.match(reg)).length > 0) {
                phone.classList.remove('input_state_invalid');
                text.classList.remove('text_state_invalid');
            } else {
                phone.classList.add('input_state_invalid');
                text.classList.add('text_state_invalid');
            }
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (isClicked === false) {
                isClicked = true;
            }

            validateName(name);
            validateEmail(email);
            validatePhone(phone);

            const inputMatches = document.querySelectorAll('.input_state_invalid');

            if (inputMatches.length === 0) {
                form.submit();
            }
        });
    }

    validate();
});
