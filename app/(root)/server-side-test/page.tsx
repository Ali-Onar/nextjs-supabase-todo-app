import { createClerkSupabaseClient } from '@/utils/supabase/supabaseServer';

export default async function ServerSideTest() {
    try {
        const supabase = await createClerkSupabaseClient();

        const { data, error } = await supabase
            .from('todos')
            .select('*')
            .order('id', { ascending: false });

        if (error) {
            console.log('SSR test error', error.message);

            return <div>Error</div>;
        }

        return (
            <div>
                {data && data.map((todo) => (
                    <div key={todo.id}>
                        <p>{todo.text}</p>
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        console.log('SSR test error', error);

        return <div>Error</div>;
    }
}
