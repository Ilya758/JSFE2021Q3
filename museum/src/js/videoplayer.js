document.addEventListener('DOMContentLoaded', () => {
    const primaryPlayBtn = document.querySelector('.video__btn-play');
    const secondaryPlayButton = document.querySelector('.video__controls-play');
    const volume = document.querySelector('.range_elem_sound');
    const mute = document.querySelector('.video__controls-mute');
    const rewinder = document.querySelector('.range_elem_time');
    const fullscreen = document.querySelector('.video__controls-fullscreen');
    const videoControlsPanel = document.querySelector('.video__controls');
    const videoSliderControls = document.querySelector('.video-slider__controls');
    const video = document.querySelector('video');
    const videoContainer = document.querySelector('.video__container');
    const videoMainContainer = document.querySelector('.video__container-main');

    let setMuteVal = setMute();

    document.addEventListener('click', (event) => {
        playAndStop(event);
        enableFullscreenByButtonClick(event);

        if ((event.target !== primaryPlayBtn && event.target !== video && event.target !== secondaryPlayButton && event.target !== videoControlsPanel)) {
            video.dataset.focus = 'disabled';
        }

    });

    document.addEventListener('keydown', (event) => keydownHandler(event));

    function keydownHandler(event) {

        if (video.dataset.focus === 'active' && event.keyCode === 32) {
            event.preventDefault();
            playAndStop(event);
        }

        if (event.keyCode === 77) {
            setMuteVal();
        }

        if (event.shiftKey && event.keyCode === 188) {

            if (video.playbackRate >= 0.50) {
                video.playbackRate -= 0.25;
                generatePlaybackRate();
            }
        }

        if (event.shiftKey && event.keyCode === 190) {

            if (video.playbackRate < 2.5) {
                video.playbackRate += 0.25;
                generatePlaybackRate();
            }
        }

        if (event.keyCode === 70) {
            fullscreenHandler();
        }
    }

    function generatePlaybackRate() {
        const pbRate = document.querySelector('.playback-rate');
        pbRate.textContent = video.playbackRate.toFixed(2);

        if (!pbRate.classList.contains('playback-rate_state_fadeIn')) {
            pbRate.classList.add('playback-rate_state_fadeIn');
            pbRate.classList.remove('playback-rate_state_fadeOut');
            setTimeout(() => {
                pbRate.classList.add('playback-rate_state_fadeOut');
                pbRate.classList.remove('playback-rate_state_fadeIn');
            }, 1500);
        }
    }

    volume.addEventListener('input', () => {
        changeVolume(volume);
        fillTheGradient(volume);
    });

    rewinder.addEventListener('input', () => {
        rewindVideo(rewinder);
        fillTheGradient(rewinder);
    });

    mute.addEventListener('click', setMuteVal);

    function playAndStop(event) {

        video.dataset.focus = 'active';

        if ((event.target === primaryPlayBtn || event.target === video || event.target === secondaryPlayButton || event.keyCode === 32)) {

            if (video.dataset.state === 'pre-pause') {
                video.play();
                primaryPlayBtn.classList.add('video__btn-play_state_fade');
                secondaryPlayButton.classList.add('video__controls-play_state_pre-pause');
                video.dataset.state = 'pre-play';
            } else {

                if (video.currentTime.toFixed(2) === video.duration.toFixed(2)) {
                    video.currentTime = 0;
                    video.play();
                } else {
                    primaryPlayBtn.classList.remove('video__btn-play_state_fade');
                    secondaryPlayButton.classList.remove('video__controls-play_state_pre-pause');
                    video.pause();
                    video.dataset.state = 'pre-pause';
                }
            }
        }

        video.addEventListener('timeupdate', () => {
            fillTheGradient(rewinder);
        });
    }

    function fillTheGradient(elem, newVideoLoad) {

        if (elem === rewinder && video.dataset.state === 'pre-play') {
            elem.value = video.currentTime * 100 / video.duration;
        }

        if (newVideoLoad === true) {
            elem.value = 0;
        }

        let value = elem.value;
        elem.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
    }

    function changeVolume(elem) {
        const val = elem.value;
        video.volume = val / 100;

        if (video.volume === 0) {
            mute.classList.add('video__controls-mute_state_mute');
        } else {
            mute.classList.remove('video__controls-mute_state_mute');
        }
    }

    function setMute(v) {
        let val = v;

        return function () {

            if (mute.dataset.state === 'no-mute') {
                val = volume.value;
                volume.value = 0;
                changeVolume(volume);
                fillTheGradient(volume);
                video.muted = true;
                mute.classList.add('video__controls-mute_state_mute');
                mute.dataset.state = 'mute';
            } else {
                volume.value = val;
                changeVolume(volume);
                fillTheGradient(volume);
                video.muted = false;
                mute.classList.remove('video__controls-mute_state_mute');
                mute.dataset.state = 'no-mute';
            }
        };
    }

    function rewindVideo(elem) {
        const duration = video.duration;
        video.currentTime = elem.value * duration / 100;
    }

    function enableFullscreenByButtonClick(event) {

        if (event.target === fullscreen) {
            fullscreenHandler();
        }
    }

    function fullscreenHandler() {
        if (fullscreen.dataset.full === 'active') {
            document.exitFullscreen();
            rewinder.classList.remove('rewinder_width_full');
            fullscreen.dataset.full = 'disabled';
            videoContainer.classList.remove('video__container_state_fullscreen');
            videoMainContainer.classList.remove('video__container-main_state_fullscreen');
        } else {
            if (video.dataset.focus === 'active') {
                videoContainer.requestFullscreen();
                fullscreen.dataset.full = 'active';
                rewinder.classList.add('rewinder_width_full');
                videoContainer.classList.add('video__container_state_fullscreen');
                videoMainContainer.classList.add('video__container-main_state_fullscreen');
            }
        }
    }

    const prevEl = document.querySelector('.video-slider__btn-prev');
    const nextEl = document.querySelector('.video-slider__btn-next');
    const controls = document.querySelector('.video-slider__controls');

    videoSliderControls.addEventListener('click', (event) => {

        if (event.target.tagName === 'LI') {
            toggleVideo(event.target.dataset.count);
        }

    });

    controls.addEventListener('click', (event) => {
        if (event.target === prevEl) {
            toggleVideo();
        }

        if (event.target === nextEl) {
            toggleVideo();
        }
    });


    function toggleVideo(index) {

        let count;

        if (!index) {
            count = document.querySelectorAll('.swiper-pagination-bullet-active')[1].dataset.count;
        } else {
            count = index;
        }

        video.poster = `video/poster${count - 1}.jpg`;

        setTimeout(() => {
            video.setAttribute('src', `video/video${count - 1}.mp4`);
            primaryPlayBtn.classList.remove('video__btn-play_state_fade');
            secondaryPlayButton.classList.remove('video__controls-play_state_pre-pause');
            fillTheGradient(rewinder, true);
        }, 490);

        video.dataset.state = 'pre-pause';
    }
});
