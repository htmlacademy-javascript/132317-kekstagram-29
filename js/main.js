import {getPictures} from './data.js';
import {fillingListPictures} from './miniatures.js';
import './full-photos.js';
import {openModalFormScript} from './form.js';

fillingListPictures(getPictures());
openModalFormScript();
