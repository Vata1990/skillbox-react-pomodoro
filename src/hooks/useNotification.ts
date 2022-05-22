import { useState } from 'react';

type CreateNotificationType = (title: string, body?: string) => void;

export const useNotification = (): [
  Notification | null,
  CreateNotificationType
] => {
  const [notification, setNotification] = useState<null | Notification>(null);
  Notification.requestPermission();

  const createNotification: CreateNotificationType = (title, body) => {
    setNotification(new Notification(title, { body: body }));
  };

  return [notification, createNotification];
};
