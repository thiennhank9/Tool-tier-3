import { observable, action } from 'mobx';
import localesEng from 'app/locales/text.eng';

class Global {
  @observable locales = localesEng;
}

const global = new Global();

export default global;
