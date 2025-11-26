import { keccak256, toUtf8Bytes, verifyMessage } from 'ethers';

function fail(msg: string): never {
  console.error('Signature verification FAILED:', msg);
  process.exit(1);
}

function ok(msg: string): never {
  console.log('Signature verification PASSED:', msg);
  process.exit(0);
}

async function main() {
  const comment = process.env.COMMENT_BODY?.toString();

  if (!comment) {
    fail(
      'No signature payload provided.'
    );
  }

  let payload: any;

  try {
    payload = JSON.parse(comment);
  } catch (e) {
    fail(`Invalid JSON in comment: ${e.message}`);
  }

  const { tag, address, referenceHash, signature, message } = payload ?? {};

  if (tag !== 'register_delegate') {
    fail(`Unexpected tag: ${tag}. Expected "register_delegate".`);
  }

  if (!address || !referenceHash || !signature || !message) {
    fail(
      'Missing one of required fields: address, referenceHash, signature, message.'
    );
  }

  if (keccak256(toUtf8Bytes(message)).toLowerCase() !== referenceHash.toLowerCase()) {
    fail(
      'Reference hash mismatch.'
    );
  }

  const recovered = verifyMessage(message, signature);

  if (recovered.toLowerCase() !== address.toLowerCase()) {
    fail(
      'Address does not match expected'
    );
  }

  ok(`Delegate payload and signature are valid for address ${address}.`);
}

main().catch((err) => {
  fail((err as Error).message);
});


