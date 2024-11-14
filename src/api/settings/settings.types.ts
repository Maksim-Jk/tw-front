interface ISetting {
  id: number;
  name: string;
}

type SettingType = 'types' | 'statuses' | 'priorities' | 'flags';

export type ISettingsDto = {
  [key in SettingType]: ISetting[];
} & {
  project_id: number;
};
