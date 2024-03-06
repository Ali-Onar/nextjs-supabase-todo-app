/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import getSupabaseServer from '@/utils/supabase/supabaseServer';
import { handleErrorResponse, handleJSErrorResponse } from '@/utils/supabase/supabaseErrorHandlers';

export async function GET() {
    try {
        const { userId } = auth();
        const supabase = await getSupabaseServer();

        const { data, error } = await supabase
            .from('todos')
            .select('*')
            .order('id', { ascending: false })
            .eq('clerk_user_id', userId);

        handleErrorResponse(error);

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        const err = error as Error;

        handleJSErrorResponse(err.message);
    }
}

export async function POST(request: Request) {
    try {
        const supabase = await getSupabaseServer();

        const body = await request.json();
        const { insertData } = body;

        const { data, error } = await supabase
            .from('todos')
            .insert([insertData]).select();

        handleErrorResponse(error);

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        const err = error as Error;

        handleJSErrorResponse(err.message);
    }
}

export async function PUT(request: Request) {
    try {
        const supabase = await getSupabaseServer();

        const body = await request.json();
        const { updatedData } = body;

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const { data, error } = await supabase
            .from('todos')
            .update(updatedData)
            .eq('id', id)
            .select();

        handleErrorResponse(error);

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        const err = error as Error;

        handleJSErrorResponse(err.message);
    }
}

export async function DELETE(request: Request) {
    try {
        const supabase = await getSupabaseServer();

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const { data, error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id)
            .select();

        handleErrorResponse(error);

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        const err = error as Error;

        handleJSErrorResponse(err.message);
    }
}
