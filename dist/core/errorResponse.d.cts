import { NextResponse } from 'next/server';

declare function toNextResponseFromError(err: unknown): NextResponse<any>;

export { toNextResponseFromError };
