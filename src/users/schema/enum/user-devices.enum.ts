export const USER_DEVICES = ['mobile', 'pc'] as const;
export type TUserDevice = typeof USER_DEVICES[number];
