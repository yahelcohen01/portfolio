# Axios Configuration

This directory contains the global axios instance configuration for the portfolio application.

## Files

- `axios.ts` - Global axios instance with interceptors and helper functions

## Features

### Global Axios Instance

- 10-second timeout
- Default headers including User-Agent
- Request/response interceptors for logging
- Error handling with detailed logging

### Helper Functions

- `getWithRevalidation(url, revalidateSeconds)` - GET request with Next.js revalidation support
- `getTextWithRevalidation(url, revalidateSeconds)` - GET request that returns text data

## Usage

```typescript
import axiosInstance, {
  getWithRevalidation,
  getTextWithRevalidation,
} from "@/app/lib/axios";

// Basic GET request
const response = await axiosInstance.get("/api/endpoint");

// GET with revalidation (for Next.js API routes)
const text = await getTextWithRevalidation("/api/tle", 7200); // 2 hours

// POST request
const response = await axiosInstance.post("/api/endpoint", { data: "value" });
```

## Interceptors

### Request Interceptor

- Logs requests in development mode
- Adds default headers

### Response Interceptor

- Logs responses in development mode
- Provides detailed error logging for API errors, network errors, and request setup errors

## Error Handling

The axios instance includes comprehensive error handling:

- API errors (4xx, 5xx responses)
- Network errors (connection issues)
- Request setup errors (invalid configuration)

All errors are logged with detailed information including URL, status codes, and error messages.
