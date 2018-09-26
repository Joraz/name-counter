# name-counter

Simple library to extract and count names from a supplied piece of text.

## Usage

Exports a single function `countNames`, with the following signature:

```typescript
countNames(text: string, titles: string[], firstNames: string[], lastNames: string[]): Array<{ name: string, timesFound: number }>
```

| Param      | Type     | Description                                                 |
| ---------- | -------- | ----------------------------------------------------------- |
| text       | string   | The text to be searched through                             |
| titles     | string[] | Array of allowable titles (e.g. Mr, Mrs, Ms)                |
| firstNames | string[] | Array of allowable first names (also used for middle names) |
| lastNames  | string[] | Array of allowable last names                               |

## Example

```typescript
countNames('My name is Mr. Daniel Young and I like to code', ['Mr', 'Mrs'], ['Daniel', 'Danielle'], ['Young', 'Old']) // returns [{ name 'Mr Daniel Young', timesFound: 1}]
```