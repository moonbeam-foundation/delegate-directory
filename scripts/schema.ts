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
  name: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[a-zA-Z0-9\s\-_'.,|]+$/),
  description: z
    .string()
    .min(10)
    .max(2000)
    .regex(/^[a-zA-Z0-9\s\-_'.,|]+$/)
    .refine((val) => !/javascript:|data:|vbscript:|on\w+\s*=/i.test(val)),
  interests: z
    .array(DelegateInterests)
    .min(1),
  tracks: z
    .array(OpenGovTracks)
    .min(1),
  twitter: z
    .string()
    .regex(/^@?[a-zA-Z0-9_]+$/)
    .max(15)
    .optional(),
  website: z
    .string()
    .regex(/^https:\/\/.+/)
    .min(12)
    .max(500)
    .optional(),
  forum: z
    .string()
    .regex(/^[a-zA-Z0-9._-]+$/)
    .max(100)
    .optional(),
  ensName: z
    .string()
    .regex(/^[a-zA-Z0-9.-]+\.eth$/)
    .max(100)
    .optional(),
  discussionThread: z
    .string()
    .startsWith('https://forum.moonbeam.network/')
    .min(32)
    .max(500)
    .optional(),
});

const DelegatesArraySchema = z.array(DelegateSchema);

export function validateDelegates(delegates: unknown) {
  return DelegatesArraySchema.safeParse(delegates);
}