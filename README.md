# Moonbeam Delegate Registry

This repository maintains a comprehensive directory of governance delegates for the Moonbeam Ecosystem. It contains structured information about individuals and organizations who participate in Moonbeam's governance system, allowing token holders to discover and delegate their voting power to trusted representatives.

## About

The registry stores delegate information in JSON format, including their addresses, descriptions, interests, and governance track preferences. This data is used by applications and interfaces to help users make informed delegation decisions for Moonbeam's OpenGov system.

Each delegate entry includes:

- **Address**: Ethereum-compatible address for delegation
- **Name**: Display name of the delegate
- **Description**: Detailed information about the delegate's background and governance approach
- **Interests**: Areas of focus (governance, DeFi, security, etc.)
- **Tracks**: Governance tracks the delegate is active in (root, general_admin, referendum_killer, etc.)

## GitHub Workflows

This repository uses GitHub Actions workflows to validate and lint delegate JSON files.

### 1. Validate Delegates

**File:** `.github/workflows/validate-delegates.yml`

Validates that all fields match the Zod schema defined in `scripts/schema.ts`

### 2. Lint

**File:** `.github/workflows/lint.yml`

Lints JSON files to ensure they are properly formatted and valid.

### 3. Security Check

**File:** `.github/workflows/security-check.yml`

Performs basic security checks:

- Detects URL shorteners (bit.ly, tinyurl, etc.)
- Checks for suspicious patterns in descriptions

## Local Validation

You can validate files locally using Bun:

```bash
# Install dependencies
bun install

# Validate all delegate files
bun scripts/validate.ts
```

## Verify Delegate Signature

You can verify a delegate signature locally using Bun:

```bash
# Install dependencies
bun install

# Verify a delegate signature (local testing) using a CLI argument
bunx tsx scripts/verify-signature.ts "$(cat payload.json)"
```
