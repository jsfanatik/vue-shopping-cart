// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.VUE_APP_SUPABASE_URL
// const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gyltaswaqxankvogihwn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5bHRhc3dhcXhhbmt2b2dpaHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUzNzI3MTUsImV4cCI6MTk5MDk0ODcxNX0.IbmJ8o1XuXZij89_IwQ3VJkL7vYstlfZm6WnY7YK2Aw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)