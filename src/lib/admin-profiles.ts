export const adminProfiles = [
  {
    id: "abdur-rafay-khan",
    name: "Abdur Rafay Khan",
    username: "abdurrafaykhan@psametra.tech",
    passwordEnvironmentKey: "ADMIN_ABDUR_PASSWORD_HASH",
  },
  {
    id: "muhammad-saad",
    name: "Muhammad Saad",
    username: "muhammadsaad@psametra.tech",
    passwordEnvironmentKey: "ADMIN_SAAD_PASSWORD_HASH",
  },
] as const;

export type AdminProfile = (typeof adminProfiles)[number];
export type AdminProfileId = AdminProfile["id"];
