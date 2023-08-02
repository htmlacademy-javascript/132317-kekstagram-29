//import {getPictures} from './data.js';
import {fillingListPictures} from './miniatures.js';
import './full-photos.js';
import {openModalFormScript} from './form.js';
import {getData} from './api.js';
import {showAlert} from './utils.js';


openModalFormScript();

try {
  const data = await getData();
  fillingListPictures(data);
} catch (err) {
  showAlert(err.massage);
}
