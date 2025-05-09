import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import {
  type User,
  type InsertUser,
  type Booking,
  type InsertBooking,
  type ContactMessage,
  type InsertContactMessage,
  type BookingFormValues,
  type ContactFormValues
} from '@shared/schema';

// Initialize environment
dotenv.config();

// Create Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export class SupabaseStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching user:', error);
      return undefined;
    }
    
    return data as User;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) {
      console.error('Error fetching user by email:', error);
      return undefined;
    }
    
    return data as User;
  }

  async createUser(user: InsertUser): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert(user)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating user:', error);
      throw error;
    }
    
    return data as User;
  }
  
  // Booking operations
  async createBooking(booking: Omit<BookingFormValues, "agreeToTerms">): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        first_name: booking.firstName,
        last_name: booking.lastName,
        email: booking.email,
        phone: booking.phone,
        service_type: booking.serviceType,
        event_date: booking.eventDate,
        location: booking.location || '',
        message: booking.message || '',
        budget: booking.budget,
        status: 'pending'
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
    
    // Format the data to match our schema
    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone,
      serviceType: data.service_type,
      eventDate: data.event_date,
      location: data.location,
      message: data.message,
      budget: data.budget,
      status: data.status,
      createdAt: new Date(data.created_at)
    };
  }
  
  async getBooking(id: number): Promise<Booking | undefined> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching booking:', error);
      return undefined;
    }
    
    // Format the data to match our schema
    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone,
      serviceType: data.service_type,
      eventDate: data.event_date,
      location: data.location,
      message: data.message,
      budget: data.budget,
      status: data.status,
      createdAt: new Date(data.created_at)
    };
  }
  
  async getAllBookings(): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching all bookings:', error);
      return [];
    }
    
    // Format the data to match our schema
    return data.map(booking => ({
      id: booking.id,
      firstName: booking.first_name,
      lastName: booking.last_name,
      email: booking.email,
      phone: booking.phone,
      serviceType: booking.service_type,
      eventDate: booking.event_date,
      location: booking.location,
      message: booking.message,
      budget: booking.budget,
      status: booking.status,
      createdAt: new Date(booking.created_at)
    }));
  }
  
  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating booking status:', error);
      return undefined;
    }
    
    // Format the data to match our schema
    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone,
      serviceType: data.service_type,
      eventDate: data.event_date,
      location: data.location,
      message: data.message,
      budget: data.budget,
      status: data.status,
      createdAt: new Date(data.created_at)
    };
  }
  
  // Contact message operations
  async createContactMessage(message: ContactFormValues): Promise<ContactMessage> {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        name: message.name,
        email: message.email,
        subject: message.subject,
        message: message.message,
        is_read: false
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating contact message:', error);
      throw error;
    }
    
    // Format the data to match our schema
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      isRead: data.is_read,
      createdAt: new Date(data.created_at)
    };
  }
  
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching contact message:', error);
      return undefined;
    }
    
    // Format the data to match our schema
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      isRead: data.is_read,
      createdAt: new Date(data.created_at)
    };
  }
  
  async getAllContactMessages(): Promise<ContactMessage[]> {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching all contact messages:', error);
      return [];
    }
    
    // Format the data to match our schema
    return data.map(msg => ({
      id: msg.id,
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      isRead: msg.is_read,
      createdAt: new Date(msg.created_at)
    }));
  }
  
  async updateContactMessageReadStatus(id: number, isRead: boolean): Promise<ContactMessage | undefined> {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ is_read: isRead })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating contact message read status:', error);
      return undefined;
    }
    
    // Format the data to match our schema
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      isRead: data.is_read,
      createdAt: new Date(data.created_at)
    };
  }

  // Portfolio operations
  async getPortfolioItems() {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching portfolio items:', error);
      return [];
    }
    
    return data;
  }

  async createPortfolioItem(item: any) {
    const { data, error } = await supabase
      .from('portfolio_items')
      .insert(item)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating portfolio item:', error);
      throw error;
    }
    
    return data;
  }

  async updatePortfolioItem(id: number, updates: any) {
    const { data, error } = await supabase
      .from('portfolio_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating portfolio item:', error);
      return undefined;
    }
    
    return data;
  }

  async deletePortfolioItem(id: number) {
    const { error } = await supabase
      .from('portfolio_items')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting portfolio item:', error);
      return false;
    }
    
    return true;
  }

  // Offers operations
  async getOffers() {
    const { data, error } = await supabase
      .from('offers')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching offers:', error);
      return [];
    }
    
    return data;
  }

  async createOffer(offer: any) {
    const { data, error } = await supabase
      .from('offers')
      .insert(offer)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating offer:', error);
      throw error;
    }
    
    return data;
  }

  async updateOffer(id: number, updates: any) {
    const { data, error } = await supabase
      .from('offers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating offer:', error);
      return undefined;
    }
    
    return data;
  }

  async deleteOffer(id: number) {
    const { error } = await supabase
      .from('offers')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting offer:', error);
      return false;
    }
    
    return true;
  }
}

export const supabaseStorage = new SupabaseStorage();