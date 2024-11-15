import { TaskFlags, TaskStatus } from '@/api/tasks/task.types';
import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';

export const getStatusSeverity = (status: TaskStatus): 'success' | 'info' | 'secondary' => {
  switch (status) {
    case TaskStatus.COMPLETED:
      return 'success';
    case TaskStatus.IN_PROGRESS:
      return 'info';
    default:
      return 'secondary';
  }
};

export const getFlagSeverity = (flag: TaskFlags): 'danger' | 'secondary' => {
  switch (flag) {
    case TaskFlags.URGENT:
      return 'danger';
    default:
      return 'secondary';
  }
};

export const getStatusIcon = (status: TaskStatus): string | null => {
  switch (status) {
    case TaskStatus.COMPLETED:
      return 'pi pi-check';
    case TaskStatus.IN_PROGRESS:
      return 'pi pi-circle-fill';
    default:
      return null;
  }
};

export const formatTaskDate = (date: Date | string, locale: string): string => {
  const dateObj = new Date(date);
  const timezoneOffset = dateObj.getTimezoneOffset() * 60000;
  const localDate = new Date(dateObj.getTime() - timezoneOffset);
  const currentLocale = locale === 'ru' ? ru : enUS;

  if (isToday(localDate)) {
    return formatDistanceToNow(localDate, {
      locale: currentLocale,
      addSuffix: true,
    });
  }

  if (isYesterday(localDate)) {
    return format(localDate, "'вчера в' HH:mm", { locale: currentLocale });
  }

  return format(localDate, 'dd.MM.yyyy в HH:mm', { locale: currentLocale });
};
