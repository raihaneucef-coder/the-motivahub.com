# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: en-fr-audit.spec.ts >> EN/FR full audit >> /contact/
- Location: tests/en-fr-audit.spec.ts:18:5

# Error details

```
AggregateError: apiRequestContext.get: connect ECONNREFUSED ::1:4321
connect ECONNREFUSED 127.0.0.1:4321
Call log:
  - → GET http://localhost:4321/contact/
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.8010.12 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br

```