import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { DatabaseService } from '../services/database';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<{ data: any; error: any }>;
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        setError(null);
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('خطأ في الحصول على الجلسة:', error);
          setError(error.message);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('خطأ في تهيئة المصادقة:', error);
        setError('خطأ في الاتصال بالخادم');
      } finally {
        setLoading(false);
      }
    };

    // تأخير قليل لتجنب مشاكل التهيئة
    const timer = setTimeout(initializeAuth, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Listen for auth changes
    let subscription: any;
    
    try {
      const { data } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          try {
            setError(null);
            setSession(session);
            setUser(session?.user ?? null);
          } catch (error) {
            console.error('خطأ في تغيير حالة المصادقة:', error);
            setError('خطأ في تحديث حالة المصادقة');
          } finally {
            setLoading(false);
          }
        }
      );
      
      subscription = data.subscription;
    } catch (error) {
      console.error('خطأ في إعداد مراقب المصادقة:', error);
      setError('خطأ في إعداد المصادقة');
      setLoading(false);
    }

    return () => {
      if (subscription) {
        try {
          subscription.unsubscribe();
        } catch (error) {
          console.error('خطأ في إلغاء الاشتراك:', error);
        }
      }
    };
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    return await DatabaseService.signUp(email, password, userData);
  };

  const signIn = async (email: string, password: string) => {
    return await DatabaseService.signIn(email, password);
  };

  const signOut = async () => {
    return await DatabaseService.signOut();
  };

  const value = {
    session,
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  // معالجة الأخطاء
  if (error) {
    console.error('خطأ في AuthContext:', error);
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 