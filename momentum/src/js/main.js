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
visualizer();
preloader();
