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

This repository uses GitHub Actions workflows to validate delegate JSON files.

## Workflows

### 1. Validate Delegate JSON Files

**File:** `.github/workflows/validate-delegates.yml`

Validates that:

- JSON files have valid syntax
- Root element is an array
- Each delegate has required fields: `address`, `name`, `description`, `interests`, `tracks`
- Ethereum addresses are in correct format (`0x` followed by 40 hex characters)
- `interests` and `tracks` are arrays
- No duplicate addresses within a file

Runs on: Pull requests and pushes to main/master that modify JSON files in `data/`

### 2. Format JSON Files

**File:** `.github/workflows/format-json.yml`

Checks that JSON files are properly formatted (pretty-printed).

Runs on: Pull requests that modify JSON files in `data/`

### 3. Security Check

**File:** `.github/workflows/security-check.yml`

Performs basic security checks:

- Detects URL shorteners (bit.ly, tinyurl, etc.)
- Checks for suspicious patterns in descriptions

Runs on: Pull requests that modify JSON files in `data/`

## Local Validation

You can validate files locally using `jq`:

```bash
# Validate JSON syntax
jq empty data/moonbeam.json

# Check structure
jq 'type' data/moonbeam.json  # Should output "array"

# Format JSON
jq . data/moonbeam.json > formatted.json
```
