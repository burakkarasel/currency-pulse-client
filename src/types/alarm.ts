export type AlarmType = {
  id: string;
  currencyName: string;
  userId: string;
  rate: number;
  currentGoldRate: number;
  targetRate: number;
  tenPercentNotificationId: string;
  tenPercentRotationNotificationId: string;
  targetNotificationId: string;
  createdAt: Date;
};
