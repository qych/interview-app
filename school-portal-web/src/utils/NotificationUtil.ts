import { notification } from 'antd';

export class NotificationUtil {

  static success(description: string, message = 'Success') {
    notification.open({ type: 'success', message, description });
  }

  static error(description: string, message = 'Error') {
    notification.open({ type: 'error', message, description });
  }

}
