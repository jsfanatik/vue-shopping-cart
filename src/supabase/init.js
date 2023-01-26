// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.VUE_APP_SUPABASE_URL
// const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gyltaswaqxankvogihwn.supabase.co'
// const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5bHRhc3dhcXhhbmt2b2dpaHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1MDgxNTgsImV4cCI6MTk5MDA4NDE1OH0.XVjhTIHyExda7x0iQCY4d0IBeuuWMmBPnW5klSpMFPA'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)