import { notification } from "antd";

export const openNotificationWithIcon = (
  type,
  message,
  placement = "topRight"
) => {
  notification[type]({
    message,
    placement,
  });
};
