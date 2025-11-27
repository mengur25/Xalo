
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://skmsyvajejmgylakorpr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrbXN5dmFqZWptZ3lsYWtvcnByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NjYzNjUsImV4cCI6MjA3OTU0MjM2NX0.WbCL7VAwLIjIOy0kxqtuTTQZWE6jrcMPQP6rv9L-NbQ";

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
    console.log("--- Checking 'id' column in quiz_questions ---");

    const { error } = await supabase
        .from('quiz_questions')
        .select('id')
        .limit(1);

    if (error) {
        console.log("'id' column query failed:", error.message);
    } else {
        console.log("'id' column query SUCCESS.");
    }
}

inspect();
