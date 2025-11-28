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

const xssRegex =
  /javascript:|data:|vbscript:|on\w+\s*=|<\s*script|<\s*iframe|<\s*object|<\s*embed|<\s*link|<\s*style|expression\s*\(/i;

const encodedHtmlRegex = /&#|%3c|%3e|&lt;|&gt;|&#x/i;

const baseTextRegex = /^[a-zA-Z0-9\s\-_'.,|]+$/;

const DelegateSchema = z.object({
  address: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/),

  name: z
    .string()
    .min(3)
    .max(100)
    .regex(baseTextRegex)
    .refine((val) => !xssRegex.test(val), {
      message: 'Name contains potentially unsafe content',
    })
    .refine((val) => !encodedHtmlRegex.test(val), {
      message: 'Name contains encoded HTML which is not allowed',
    }),

  description: z
    .string()
    .min(10)
    .max(2000)
    .regex(baseTextRegex)
    .refine((val) => !xssRegex.test(val), {
      message: 'Description contains potentially unsafe content',
    })
    .refine((val) => !encodedHtmlRegex.test(val), {
      message: 'Description contains encoded HTML which is not allowed',
    }),

  interests: z.array(DelegateInterests).min(1),

  tracks: z.array(OpenGovTracks).min(1),

  twitter: z
    .string()
    .regex(/^@?[a-zA-Z0-9_]+$/)
    .max(15)
    .refine((val) => !xssRegex.test(val), {
      message: 'Twitter handle contains potentially unsafe content',
    })
    .refine((val) => !encodedHtmlRegex.test(val), {
      message: 'Twitter handle contains encoded HTML which is not allowed',
    })
    .optional(),

  website: z
    .url({ message: 'Website must be a valid URL' })
    .regex(/^https:\/\/[^?#]+$/, {
      message:
        'Website must use HTTPS and cannot contain query parameters or hash fragments',
    })
    .min(12)
    .max(500)
    .refine((val) => !xssRegex.test(val), {
      message: 'Website contains potentially unsafe content',
    })
    .refine((val) => !encodedHtmlRegex.test(val), {
      message: 'Website contains encoded HTML which is not allowed',
    })
    .optional(),

  forum: z
    .string()
    .regex(/^[a-zA-Z0-9._-]+$/)
    .max(100)
    .refine((val) => !xssRegex.test(val), {
      message: 'Forum handle contains potentially unsafe content',
    })
    .refine((val) => !encodedHtmlRegex.test(val), {
      message: 'Forum handle contains encoded HTML which is not allowed',
    })
    .optional(),

  ensName: z
    .string()
    .regex(/^[a-zA-Z0-9.-]+\.eth$/)
    .max(100)
    .refine((val) => !xssRegex.test(val), {
      message: 'ENS name contains potentially unsafe content',
    })
    .refine((val) => !encodedHtmlRegex.test(val), {
      message: 'ENS name contains encoded HTML which is not allowed',
    })
    .optional(),

  discussionThread: z
    .url({ message: 'Discussion thread must be a valid URL' })
    .startsWith('https://forum.moonbeam.network/')
    .min(32)
    .max(500)
    .refine((val) => !xssRegex.test(val), {
      message: 'Discussion thread contains potentially unsafe content',
    })
    .refine((val) => !encodedHtmlRegex.test(val), {
      message: 'Discussion thread contains encoded HTML which is not allowed',
    })
    .optional(),
});

const DelegatesArraySchema = z.array(DelegateSchema);

export function validateDelegates(delegates: unknown) {
  return DelegatesArraySchema.safeParse(delegates);
}
