import * as React from "react";
import {
    ToastProvider,
    ToastViewport,
    Toast,
    ToastDescription,
    ToastTitle,
    ToastAction
} from "@/components/ui/toast";

export enum NotificationType {
    Success = 'success',
    Error = 'error',
    Warning = 'warning',
    Info = 'info'
}

interface NotificationProps {
    notifications: {
        id?: string;
        notificationType: NotificationType;
        title: string;
        description: string;
        actionText?: string;
        onActionClick?: () => void;
    }[];
}

export const Notification: React.FC<NotificationProps> = ({ notifications }) => {

    const mapTypeToColor = (type: NotificationType): string => {
        switch (type) {
            case NotificationType.Success:
                return '#8fcb9b';
            case NotificationType.Error:
                return '#d6a2ad';
            case NotificationType.Warning:
                return '#ffcf56';
            case NotificationType.Info:
            default:
                return '#ffffff';
        }
    };

    return (
        <ToastProvider>
            <ToastViewport>
                {notifications.map(notification => (
                    <Toast key={notification.id || new Date().getTime().toString()} style={{ backgroundColor: mapTypeToColor(notification.notificationType) }}>
                        <div className="grid gap-1">
                            <ToastTitle>{notification.title}</ToastTitle>
                            <ToastDescription>{notification.description}</ToastDescription>
                        </div>
                        {notification.actionText && notification.onActionClick && (
                            <ToastAction onClick={notification.onActionClick} altText={notification.actionText}>{notification.actionText}</ToastAction>
                        )}
                    </Toast>
                ))}
            </ToastViewport>
        </ToastProvider>
    );
};

