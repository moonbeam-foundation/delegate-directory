import { keccak256, recoverMessageAddress, stringToBytes } from 'viem';

function fail(msg: string): never {
  console.error('Signature verification FAILED:', msg);
  process.exit(1);
}

function ok(msg: string): never {
  console.log('Signature verification PASSED:', msg);
  process.exit(0);
}

function parseComment(comment: string): any {
  try {
    return JSON.parse(comment);
  } catch (e) {
    throw new Error(`Invalid JSON in comment: ${(e as Error).message}`);
  }
}

async function main(comment: string | undefined) {
  if (!comment) {
    fail(
      'No signature payload provided.'
    );
  }

  const payload = parseComment(comment);

  const { tag, address, referenceHash, signature, message } = payload ?? {};

  if (tag !== 'register_delegate') {
    fail(`Unexpected tag: ${tag}. Expected "register_delegate".`);
  }

  if (!address || !referenceHash || !signature || !message) {
    fail(
      'Missing one of required fields: address, referenceHash, signature, message.'
    );
  }

  if (keccak256(stringToBytes(message)).toLowerCase() !== referenceHash.toLowerCase()) {
    fail(
      'Reference hash mismatch.'
    );
  }

  const recovered = await recoverMessageAddress({ message, signature });

  if (recovered.toLowerCase() !== address.toLowerCase()) {
    fail(
      'Address does not match expected'
    );
  }

  ok(`Delegate payload and signature are valid for address ${address}.`);
}

const [, , cliComment] = process.argv;

main(cliComment).catch((err) => {
  fail((err as Error).message);
});


