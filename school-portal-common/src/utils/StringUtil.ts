import { nanoid } from "nanoid";

export class StringUtil {

  static formatContactNumber(number: string) {
    return `${number.substring(0, 4)} ${number.substring(4)}`;
  }

  static generateUuid() {
    return nanoid();
  }

}
