export interface Competition {
  id: number
  name: string
  date: string
  location: string
  description: string | null
  created_at: string
  user_id: string | null
}

export interface Registration {
  id: number
  competition_id: number
  rider_name: string
  horse_name: string
  category: string
  email: string
  phone: string | null
  created_at: string
  user_id: string | null
}
