import getSupabaseServer from '@/utils/supabase/supabaseServer';

export default async function ServerSideTest() {
    const supabase = await getSupabaseServer();

    const { data } = await supabase
        .from('todos')
        .select('*')
        .order('id', { ascending: false });

    return (
        <div>
            {data && data.map((todo) => (
                <div key={todo.id}>
                    <p>{todo.text}</p>
                </div>
            ))}
        </div>
    );
}
