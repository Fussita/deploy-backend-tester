import { Result } from "_libs/core";
import { PushNotificationDto } from "./dto/push-notification.dto";

export interface IPushSender {
    sendNotificationByToken ( pushDto: PushNotificationDto ): Promise<Result<string>> 
}
 