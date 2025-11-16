/**
 * Supabase 데이터베이스 타입 정의
 * 
 * 이 파일은 Supabase CLI를 통해 자동 생성됩니다:
 * npm run supabase:types
 * 
 * 또는 수동으로:
 * supabase gen types typescript --local > types/supabase.ts
 */

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
      users: {
        Row: {
          id: string
          email: string
          name: string
          password: string | null
          provider: string
          avatar_url: string | null
          bio: string | null
          preferences: Json
          created_at: string
          updated_at: string
          last_login_at: string | null
        }
        Insert: {
          id?: string
          email: string
          name: string
          password?: string | null
          provider?: string
          avatar_url?: string | null
          bio?: string | null
          preferences?: Json
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          name?: string
          password?: string | null
          provider?: string
          avatar_url?: string | null
          bio?: string | null
          preferences?: Json
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
        }
        Relationships: []
      }
      travel_plans: {
        Row: {
          id: string
          user_id: string
          title: string
          destination: string
          start_date: string
          end_date: string
          budget: number | null
          currency: string
          travel_style: string[] | null
          companions: string | null
          status: string
          itinerary: Json
          notes: string | null
          is_public: boolean
          likes_count: number
          views_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          destination: string
          start_date: string
          end_date: string
          budget?: number | null
          currency?: string
          travel_style?: string[] | null
          companions?: string | null
          status?: string
          itinerary?: Json
          notes?: string | null
          is_public?: boolean
          likes_count?: number
          views_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          destination?: string
          start_date?: string
          end_date?: string
          budget?: number | null
          currency?: string
          travel_style?: string[] | null
          companions?: string | null
          status?: string
          itinerary?: Json
          notes?: string | null
          is_public?: boolean
          likes_count?: number
          views_count?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "travel_plans_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      budget_items: {
        Row: {
          id: string
          travel_plan_id: string
          category: string
          name: string
          amount: number
          currency: string
          date: string | null
          notes: string | null
          icon: string | null
          color: string | null
          is_paid: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          travel_plan_id: string
          category: string
          name: string
          amount: number
          currency?: string
          date?: string | null
          notes?: string | null
          icon?: string | null
          color?: string | null
          is_paid?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          travel_plan_id?: string
          category?: string
          name?: string
          amount?: number
          currency?: string
          date?: string | null
          notes?: string | null
          icon?: string | null
          color?: string | null
          is_paid?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "budget_items_travel_plan_id_fkey"
            columns: ["travel_plan_id"]
            referencedRelation: "travel_plans"
            referencedColumns: ["id"]
          }
        ]
      }
      chat_messages: {
        Row: {
          id: string
          user_id: string | null
          session_id: string
          role: string
          content: string
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_id: string
          role: string
          content: string
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          session_id?: string
          role?: string
          content?: string
          metadata?: Json
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      saved_guides: {
        Row: {
          id: string
          user_id: string
          guide_slug: string
          title: string
          category: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          guide_slug: string
          title: string
          category?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          guide_slug?: string
          title?: string
          category?: string | null
          notes?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_guides_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      saved_cities: {
        Row: {
          id: string
          user_id: string
          city_slug: string
          city_name: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          city_slug: string
          city_name: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          city_slug?: string
          city_name?: string
          notes?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_cities_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      travel_plan_likes: {
        Row: {
          id: string
          user_id: string
          travel_plan_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          travel_plan_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          travel_plan_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "travel_plan_likes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "travel_plan_likes_travel_plan_id_fkey"
            columns: ["travel_plan_id"]
            referencedRelation: "travel_plans"
            referencedColumns: ["id"]
          }
        ]
      }
      faqs: {
        Row: {
          id: string
          category: string
          question: string
          answer: string
          order_index: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category: string
          question: string
          answer: string
          order_index?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category?: string
          question?: string
          answer?: string
          order_index?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          id: string
          user_id: string | null
          email: string
          name: string
          subject: string
          message: string
          category: string
          status: string
          priority: string
          admin_reply: string | null
          created_at: string
          updated_at: string
          resolved_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          email: string
          name: string
          subject: string
          message: string
          category: string
          status?: string
          priority?: string
          admin_reply?: string | null
          created_at?: string
          updated_at?: string
          resolved_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          email?: string
          name?: string
          subject?: string
          message?: string
          category?: string
          status?: string
          priority?: string
          admin_reply?: string | null
          created_at?: string
          updated_at?: string
          resolved_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      popular_travel_plans: {
        Row: {
          id: string
          user_id: string
          title: string
          destination: string
          start_date: string
          end_date: string
          budget: number | null
          currency: string
          travel_style: string[] | null
          companions: string | null
          status: string
          itinerary: Json
          notes: string | null
          is_public: boolean
          likes_count: number
          views_count: number
          created_at: string
          updated_at: string
          user_name: string
          user_avatar: string | null
        }
        Relationships: []
      }
      user_travel_stats: {
        Row: {
          user_id: string
          total_plans: number
          completed_plans: number
          planning_plans: number
          total_budget: number | null
          avg_budget: number | null
        }
        Relationships: []
      }
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

