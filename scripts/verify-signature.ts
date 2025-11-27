import { keccak256, recoverMessageAddress, stringToBytes } from 'viem';

function parseComment(comment: string): any {
  try {
    // TODO: Remove
    console.log(comment);
    return JSON.parse(comment);
  } catch (e) {
    throw new Error('Invalid comment payload.');
  }
}

function verifyTag(tag: string): void {
  if (tag !== 'register_delegate') {
    throw new Error(`Unexpected tag: ${tag}. Expected "register_delegate".`);
  }
}

function verifyComment(comment: string): void {
  if (!comment) {
    throw new Error(
      'No signature payload provided.'
    );
  }
}

function verifyPayload(address: string, referenceHash: string, signature: `0x${string}`, message: string): void {
  if (!address || !referenceHash || !signature || !message) {
    throw new Error(
      'Missing one of required fields: address, referenceHash, signature, message.'
    );
  }
}

function verifyReferenceHash(referenceHash: string, message: string): void {
  if (keccak256(stringToBytes(message)).toLowerCase() !== referenceHash.toLowerCase()) {
    throw new Error(
      'Reference hash mismatch.'
    );
  }
}

async function verifyAddress(address: string, signature: `0x${string}`, message: string): Promise<void> {
  const recovered = await recoverMessageAddress({ message, signature });

  if (recovered.toLowerCase() !== address.toLowerCase()) {
    throw new Error(
      'Address does not match expected.'
    );
  }
}

async function main(comment: string) {
  verifyComment(comment);

  const payload = parseComment(comment);

  const { tag, address, referenceHash, signature, message } = payload ?? {};

  verifyTag(tag);

  verifyPayload(address, referenceHash, signature, message);

  verifyReferenceHash(referenceHash, message);

  await verifyAddress(address, signature, message);

  console.log(`Delegate payload and signature are valid for address ${address}.`);
}

const [, , comment] = process.argv;

main(comment).catch((err) => {
  throw new Error((err as Error).message);
});
