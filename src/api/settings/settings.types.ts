interface ISetting {
  id: number;
  name: string;
}

type SettingType = 'types' | 'statuses' | 'priorities' | 'flags';

export type ISettingsDto = Record<SettingType, ISetting[]>;
