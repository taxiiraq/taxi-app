import { supabase } from '../lib/supabase';
import { User, Order, SupportMessage, Notification } from '../types';

export class DatabaseService {
  // Authentication
  static async signUp(email: string, password: string, userData: Partial<User>) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });
    return { data, error };
  }

  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  }

  static async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }

  // Users
  static async createUser(userData: Omit<User, 'id' | 'createdAt'>) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();
    return { data, error };
  }

  static async getUserById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  }

  static async updateUser(id: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  }

  static async getUsersByRole(role: 'customer' | 'driver' | 'admin') {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', role);
    return { data, error };
  }

  // Orders
  static async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        customer_id: orderData.customerId,
        driver_id: orderData.driverId,
        pickup_address: orderData.pickupAddress,
        destination_address: orderData.destinationAddress,
        description: orderData.description,
        notes: orderData.notes,
        status: orderData.status || 'pending'
      }])
      .select()
      .single();
    return { data, error };
  }

  static async getOrderById(id: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customer:users!orders_customer_id_fkey(*),
        driver:users!orders_driver_id_fkey(*)
      `)
      .eq('id', id)
      .single();
    return { data, error };
  }

  static async updateOrder(id: string, updates: Partial<Order>) {
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  }

  static async getOrdersByCustomer(customerId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        driver:users!orders_driver_id_fkey(*)
      `)
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });
    return { data, error };
  }

  static async getOrdersByDriver(driverId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customer:users!orders_customer_id_fkey(*)
      `)
      .eq('driver_id', driverId)
      .order('created_at', { ascending: false });
    return { data, error };
  }

  static async getPendingOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customer:users!orders_customer_id_fkey(*)
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    return { data, error };
  }

  static async getAllOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customer:users!orders_customer_id_fkey(*),
        driver:users!orders_driver_id_fkey(*)
      `)
      .order('created_at', { ascending: false });
    return { data, error };
  }

  // Support Messages
  static async createSupportMessage(messageData: Omit<SupportMessage, 'id' | 'createdAt'>) {
    const { data, error } = await supabase
      .from('support_messages')
      .insert([messageData])
      .select()
      .single();
    return { data, error };
  }

  static async getSupportMessages() {
    const { data, error } = await supabase
      .from('support_messages')
      .select(`
        *,
        user:users!support_messages_user_id_fkey(*)
      `)
      .order('created_at', { ascending: false });
    return { data, error };
  }

  // Notifications
  static async createNotification(notificationData: Omit<Notification, 'id' | 'createdAt'>) {
    const { data, error } = await supabase
      .from('notifications')
      .insert([notificationData])
      .select()
      .single();
    return { data, error };
  }

  static async getUserNotifications(userId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  }

  static async markNotificationAsRead(id: string) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  }

  // Real-time subscriptions
  static subscribeToOrders(callback: (payload: any) => void) {
    return supabase
      .channel('orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, callback)
      .subscribe();
  }

  static subscribeToNotifications(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`notifications:${userId}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` }, 
        callback
      )
      .subscribe();
  }
} 