
export interface PushNotificationDto {
    token: string
    notification: { 
        title: string 
        body: string
        icon?: string
    }
    /*
    android: {
        notification: { 
            title: message.notification.title, 
            body: message.notification.body, 
            icon: icon, 
            clickAction: '/main', 
        } 
    },
    webpush: { 
        fcmOptions: { link: 'https://ginastic-center.web.app/home/main-course?id=c6ba86d8-987c-4601-8201-dbaa67456006', },
        notification: { 
            title: message.notification.title, 
            body: message.notification.body, 
            icon: icon,
            badge: whiteIcon,
            //actions: [ { action: 'idk', title: 'Eso Brad', icon: icon } ],
        },
    },
    */
}