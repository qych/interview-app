import { Responder } from './Responder';
import { Validator } from './Validator';

const responder = new Responder();
const validator = new Validator(responder);

export const AutoRespond = () => responder.getAutoRespondDecorator();
export const handleValidation = () => validator.getHandleValidationMiddleware();

export * from './Responder';

export { responder };
