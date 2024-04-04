import * as Sentry from '@sentry/nextjs';
import { SeverityLevel } from '@sentry/nextjs';
import { PostgrestError } from '@supabase/supabase-js';

export const supabaseReportException = (error: PostgrestError) => {
    const errorDetails = JSON.stringify({
        code: error.code,
        details: error.details,
        hint: error.hint,
        message: error.message,
    });
    Sentry.captureException(new Error(`Supabase Error: ${errorDetails}`));
};

// type SeverityLevel = "fatal" | "error" | "warning" | "log" | "info" | "debug"
export const reportLog = (errorMessage: string, errorLevel: SeverityLevel) => {
    Sentry.captureMessage(errorMessage, errorLevel);
};
