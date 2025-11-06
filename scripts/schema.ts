import { z } from 'zod';

const DelegateInterests = z.enum([
  'build',
  'defi',
  'governance',
  'grants',
  'identity',
  'legal',
  'nft',
  'security',
]);

 const OpenGovTracks = z.enum([
  'root',
  'whitelisted_caller',
  'general_admin',
  'referendum_canceller',
  'referendum_killer',
  'fast_general_admin',
]);

 const DelegateSchema = z.object({
  address: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/),
  name: z.string().min(1),
  description: z.string().min(1),
  interests: z
    .array(DelegateInterests)
    .min(1),
  tracks: z
    .array(OpenGovTracks)
    .min(1),
  twitter: z.string().optional(),
  website: z.url().optional(),
  forum: z.string().optional(),
  ensName: z.string().optional(),
  discussionThread: z.url().optional(),
});

const DelegatesArraySchema = z.array(DelegateSchema);

export function validateDelegates(delegates: unknown) {
  return DelegatesArraySchema.safeParse(delegates);
}