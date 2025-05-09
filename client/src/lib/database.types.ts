export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: number
          first_name: string
          last_name: string
          email: string
          phone: string
          service_type: string
          event_date: string | null
          location: string | null
          message: string | null
          budget: number
          status: string
          created_at: string
        }
        Insert: {
          id?: number
          first_name: string
          last_name: string
          email: string
          phone: string
          service_type: string
          event_date?: string | null
          location?: string | null
          message?: string | null
          budget: number
          status?: string
          created_at?: string
        }
        Update: {
          id?: number
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          service_type?: string
          event_date?: string | null
          location?: string | null
          message?: string | null
          budget?: number
          status?: string
          created_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: number
          name: string
          email: string
          subject: string
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          email: string
          subject: string
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          email?: string
          subject?: string
          message?: string
          is_read?: boolean
          created_at?: string
        }
      }
      offers: {
        Row: {
          id: number
          title: string
          description: string
          image: string
          original_price: number
          discounted_price: number
          discount: string | null
          start_date: string
          end_date: string | null
          is_new: boolean
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          image: string
          original_price: number
          discounted_price: number
          discount?: string | null
          start_date: string
          end_date?: string | null
          is_new?: boolean
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          image?: string
          original_price?: number
          discounted_price?: number
          discount?: string | null
          start_date?: string
          end_date?: string | null
          is_new?: boolean
          is_active?: boolean
          created_at?: string
        }
      }
      portfolio_items: {
        Row: {
          id: number
          title: string
          description: string
          category: string
          image: string
          is_video: boolean
          video_url: string | null
          featured: boolean
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          category: string
          image: string
          is_video?: boolean
          video_url?: string | null
          featured?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          category?: string
          image?: string
          is_video?: boolean
          video_url?: string | null
          featured?: boolean
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: number
          name: string
          role: string
          quote: string
          image: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          role: string
          quote: string
          image: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          role?: string
          quote?: string
          image?: string
          is_active?: boolean
          created_at?: string
        }
      }
      users: {
        Row: {
          id: number
          email: string
          username: string
          is_admin: boolean
        }
        Insert: {
          id?: number
          email: string
          username: string
          is_admin?: boolean
        }
        Update: {
          id?: number
          email?: string
          username?: string
          is_admin?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}