import VeeValidate, { Validator } from 'vee-validate';
import messages from 'vee-validate/dist/locale/zh_CN';
Validator.updateDictionary({
    zh_CN: {
        messages
    }
});
const config = {
    errorBagName: 'errors', // change if property conflicts.
    delay: 0,
    locale: 'zh_CN',
    messages: null,
    strict: true
};
export const Validate = VeeValidate;
export const Config = config;