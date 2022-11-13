import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_PROJECT_URL, process.env.NEXT_PUBLIC_PUBLIC_KEY)

export function videoService() {
	return {
		getAllVideos() {
			return supabase.from('video').select('*')
		},
		addVideo(){
			return supabase.from('video')
		}
	}
}
