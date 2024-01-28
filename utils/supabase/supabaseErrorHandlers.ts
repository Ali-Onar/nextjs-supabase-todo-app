import { PostgrestError } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

function handleErrorResponse(error: PostgrestError | null) {
    return NextResponse.json({ message: error?.message, details: error?.details, errorCode: error?.code });
}

function handleJSErrorResponse(error: any) {
    return new NextResponse(JSON.stringify(error), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    });
}

export { handleErrorResponse, handleJSErrorResponse };
