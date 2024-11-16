import { z } from 'zod';

/** Schema for synchronization options configuration */
export const syncOptionsSchema = z.object({
  /** Time interval between updates, in hours (1-24) */
  updateTimeDelta: z.number().min(1).max(24),
  /** Timestamp of the last update */
  lastUpdate: z.number(),
  /** Strategy for resolving conflicts between manual and source emojis */
  mergeMode: z.enum(['manualFirst', 'sourceFirst']),
  /** URL of the emoji mapping to sync from */
  sourceUrl: z.string().url(),
  /** Optional authentication token for accessing the source (e.g., Github PAT) */
  token: z.string().optional(),
  /** Last error message */
  lastErrorMessage: z.string().optional(),
});

/** Schema for manual settings configuration where sync is disabled */
export const manualSettingsSchema = z
  .object({
    /** Indicates that synchronization is disabled */
    isSync: z.literal(false),
  })
  .merge(syncOptionsSchema.partial());

/** Schema for sync settings configuration where sync is enabled */
export const syncSettingsSchema = z
  .object({
    /** Indicates that synchronization is enabled */
    isSync: z.literal(true),
  })
  .merge(syncOptionsSchema);

/** Combined schema that validates either manual or sync settings */
export const settingsSchema = z.union([syncSettingsSchema, manualSettingsSchema]);
