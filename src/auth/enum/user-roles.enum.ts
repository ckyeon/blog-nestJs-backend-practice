export const USER_ROLES = ['member', 'admin'] as const;
export type TUserRole = typeof USER_ROLES[number];
