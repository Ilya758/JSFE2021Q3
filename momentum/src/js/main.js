import './styles';

import clock from './clock';

import setValuesToStorage from './localStorage';

import slider from './slider';

import getQuotes from './getQuotes';

import audioplayer from './audioplayer/audioplayer';

import translate from './translate';
setValuesToStorage();
slider();
getQuotes();
audioplayer();
translate();
