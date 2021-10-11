document.addEventListener('DOMContentLoaded', () => {
    function initiateComparison() {

        function compareImages() {
            const img = document.querySelector('.explore__pictures-overlay');
            const slider = document.querySelector('.explore__picture-range');
            const sliderRect = slider.getBoundingClientRect();
            const imgRect = img.getBoundingClientRect();
            let clicks = 0;
            let imgWidth = img.offsetWidth;
            const indentX = sliderRect.x - imgRect.x;
            img.style.width = indentX + sliderRect.width / 2 + 'px';

            slider.addEventListener('mousedown', slideReady);
            window.addEventListener('mouseup', slideStop);

            function slideReady() {
                clicks = 1;
                window.addEventListener('mousemove', slideMove);
            }

            function slideStop() {
                clicks = 0;
            }

            function slideMove() {

                if (clicks === 0) {
                    return;
                }

                let position = getCursorPosition();

                if (position < 0) {
                    position = 0;
                }

                if (position > imgWidth) {
                    position = imgWidth;
                }

                slideFunc(position);
            }

            function getCursorPosition() {
                return window.event.pageX - imgRect.x - window.pageXOffset;
            }

            function slideFunc(x) {
                img.style.width = x + 'px';
                slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + 'px';
            }

            window.addEventListener('resize', () => {
                slideFunc(getCursorPosition());
            });
        }

        compareImages();
    }

    initiateComparison();
});
