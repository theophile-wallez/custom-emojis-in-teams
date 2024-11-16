export enum MergeMode {
  /**
   * Manually added custom emojis will override source emojis.
   * Default: ManualFirst
   */
  ManualFirst = 'manualFirst',
  /** Source emojis will override manually added custom emojis. */
  SourceFirst = 'sourceFirst',
}

/** Options for configuring emoji synchronization settings. */
type SyncSettingsOptions = {
  /**
   * Time interval between updates, in hours.
   * Default: 6 hours
   */
  updateTimeDelta: number;
  /** Timestamp of the last successful update. */
  lastUpdate: number;
  /** URL of the emoji mapping to sync from. */
  sourceUrl: string;
  /** Strategy for resolving conflicts between manual and source emojis. */
  mergeMode: MergeMode;
  /**
   * Optional authentication token for accessing the source.
   * Usually a Github Personal Access Token with read access to the repository that stores the mapping.
   * */
  token?: string;
  lastErrorMessage?: string;
};

export type ManualSettings = {
  isSync: false;
} & Partial<SyncSettingsOptions>;

export type SyncSettings = {
  isSync: true;
} & SyncSettingsOptions;

export type SettingsData = ManualSettings | SyncSettings;
