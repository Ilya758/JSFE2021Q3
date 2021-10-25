/* eslint-disable no-undef */
import playlist from './playlist';

export default () => {
    const audioplayer = document.querySelector('.header__audioplayer');
    const btnPlay = document.querySelector('.play.icon-player');
    const btnPrev = document.querySelector('.play-prev.icon-player');
    const btnNext = document.querySelector('.play-next.icon-player');
    const rewinder = document.querySelector('.range_elem_duration');
    const volume = document.querySelector('.range_elem_sound');
    const headerPlaylist = document.querySelector('.header__player-playlist');
    const name = document.querySelector('.header__player-songName');
    const currTime = document.querySelector('.header__player-currentTime');
    const duration = document.querySelector('.header__player-duration');
    const songName = document.querySelectorAll('.header__player-item');
    const mute = document.querySelector('.header__player-mute');
    let count = 0;
    let prevVol;

    btnPlay.addEventListener('click', playAndStop);
    btnPrev.addEventListener('click', () => {
        getTrack('prev');
    });
    btnNext.addEventListener('click', () => {
        getTrack('next');
    });

    rewinder.addEventListener('mousedown', () => {
        audioplayer.removeEventListener('timeupdate', setValueToTime);

        rewinder.addEventListener('mouseup', () => {
            audioplayer.addEventListener('timeupdate', setValueToTime);
            rewind();
        });
    });
    volume.addEventListener('input', volumeChange);
    audioplayer.addEventListener('timeupdate', () => {
        getCurrentTime();
        nextSongAfterEnding();
    });
    mute.addEventListener('click', setMute);

    function playAndStop() {
        audioplayer.addEventListener('timeupdate', setValueToTime);
        const state = audioplayer.dataset.state;
        let findElem = Array.from(headerPlaylist.children).find((el) => el.classList.contains('song_state_active'));

        if (state === 'pause') {
            audioplayer.dataset.state = 'play';
            audioplayer.play();
            btnPlay.classList.add('pause');
            findElem.classList.add('pause');
        } else {
            audioplayer.dataset.state = 'pause';
            audioplayer.pause();
            btnPlay.classList.remove('pause');
            findElem.classList.remove('pause');
        }
    }

    function rewind() {
        const value = rewinder.value;
        const audioDuration = audioplayer.duration;
        audioplayer.currentTime = audioDuration * value / 100;
    }

    function setValueToTime() {
        rewinder.value = audioplayer.currentTime * 100 / audioplayer.duration;
    }

    function nextSongAfterEnding() {
        if (audioplayer.currentTime === audioplayer.duration) {
            getTrack('next');
            getCurrentTime();
        }
    }

    function getTrack(btn) {
        let path;

        if (btn === 'prev') {
            path = playlist[count === 0 ? count = playlist.length - 1 : --count].src;
        } else {
            path = playlist[count === playlist.length - 1 ? count = 0 : ++count].src;
        }

        audioplayer.removeEventListener('timeupdate', setValueToTime);
        audioplayer.src = path;
        audioplayer.dataset.count = count;
        audioplayer.play();
        audioplayer.dataset.state = 'play';
        getDuration();
        getSongName();
        setActiveSong(count);

        setTimeout(() => {
            audioplayer.addEventListener('timeupdate', setValueToTime);
        });
    }

    function volumeChange() {
        const value = volume.value;
        audioplayer.volume = value / 100;
        volume.style.background = `linear-gradient(to right, #8bc34a, ${value}%, #cf4b4b)`;
        if (value) {
            mute.classList.remove('muted');
        }
    }

    function getCurrentTime() {
        const seconds = Math.floor(audioplayer.currentTime);
        const minutes = Math.floor(seconds / 60);
        const trueSeconds = seconds - minutes * 60;
        const time = `0${minutes}:${trueSeconds < 10 ? '0' + trueSeconds : trueSeconds}`;
        currTime.textContent = time;
    }

    function getSongName(c) {
        name.textContent = playlist[c || count].title;
    }

    function getDuration() {
        duration.textContent = playlist[count].duration;
    }

    (function generateSongNames() {
        songName.forEach((song, ndx) => {
            song.dataset.count = ndx;
            song.firstElementChild.textContent = playlist[ndx].title;
        });
    })();

    function chooseTheSong() {
        let songCounter;
        headerPlaylist.addEventListener('click', (event) => {
            audioplayer.dataset.state = 'play';
            audioplayer.removeEventListener('timeupdate', setValueToTime);
            if (event.target.tagName === 'LI') {
                songCounter = event.target.dataset.count;
                audioplayer.dataset.count = songCounter;
                const src = playlist[songCounter].src;

                if (event.target.classList.contains('song_state_active')) {
                    if (event.target.classList.contains('pause')) {
                        event.target.classList.remove('pause');
                        [event.target, btnPlay].forEach((el) => {
                            el.classList.remove('pause');
                        });
                        audioplayer.pause();
                    } else {
                        event.target.classList.add('pause');
                        [event.target, btnPlay].forEach((el) => {
                            el.classList.add('pause');
                        });
                        audioplayer.play();
                    }
                } else {
                    audioplayer.src = src;
                    audioplayer.play();
                    getDuration();
                    getSongName(songCounter);
                    setActiveSong(songCounter);
                }
            }
            setTimeout(() => audioplayer.addEventListener('timeupdate', setValueToTime));
        });
    }

    function setActiveSong(counter) {
        songName.forEach((song, ndx) => {
            if (ndx === +counter) {
                song.classList.add('song_state_active', 'pause');
                btnPlay.classList.add('pause');
            } else {
                song.classList.remove('song_state_active', 'pause');
            }
        });
    }

    function setMute() {
        if (audioplayer.volume !== 0) {
            prevVol = audioplayer.volume;
            audioplayer.volume = 0;
            mute.classList.add('muted');
        } else {
            audioplayer.volume = prevVol;
            mute.classList.remove('muted');
        }
    }

    chooseTheSong();
};
