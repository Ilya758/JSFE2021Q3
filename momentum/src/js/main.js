import './styles';

import clock from './clock';

import greeting from './greeting';

import setValuesToStorage from './localStorage';

import slider from './slider';

import getQuotes from './getQuotes';

import audioplayer from './audioplayer/audioplayer';

import settings from './settings';

import translate from './translate';

import visualizer from './visualizer';

import preloader from './preloader';

const getTime = clock();

getTime();
greeting();
setValuesToStorage();
slider();
getQuotes();
audioplayer();
settings();
translate();
preloader();

document.addEventListener('click', () => {
    visualizer();
}, { once: true });

console.log('Самооценка: 157/160 \n- Часы и календарь +15\n- Приветствие +10\n- Смена фонового изображения +20\n- Виджет погоды +15\n- Виджет - цитата дня +10\n- Аудиоплеер +15\n- Продвинутый аудиоплеер +20\n- Перевод приложения на 2 языка +15\n- Получение фонового изображения от API +10\n- Настройки приложения +17/20 (если источником получения фото указан API, в настройках приложения можно указать тег/теги, для которых API будет присылает фото - НЕ выполнил)\n- Дополнительный функционал - осциллограф на canvas при воспроизведении аудиотреков +10  ');
