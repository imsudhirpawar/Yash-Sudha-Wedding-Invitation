import { createClient } from "@supabase/supabase-js";

type Database = {
  public: {
    Tables: {
      blessings: {
        Row: {
          id: number;
          name: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          message?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient<Database>(supabaseUrl, supabaseKey)
    : null;
