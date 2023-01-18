import { notification } from 'antd';

const useNotification = () => {
  const successNotification = (description = 'Uspesno'): void => {
    notification.success({
      message: 'Success',
      description,
    });
  };

  const errorNotification = (description: string): void => {
    notification.error({
      message: "Ooopps...",
      description,
    });
  };

  return {
    successNotification,
    errorNotification,
  };
};

export { useNotification };
