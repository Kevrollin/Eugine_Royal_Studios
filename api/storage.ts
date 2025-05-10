import {
  type User,
  type InsertUser,
  type Booking,
  type InsertBooking,
  type ContactMessage,
  type InsertContactMessage,
  type BookingFormValues,
  type ContactFormValues
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Booking operations
  createBooking(booking: Omit<BookingFormValues, "agreeToTerms">): Promise<Booking>;
  getBooking(id: number): Promise<Booking | undefined>;
  getAllBookings(): Promise<Booking[]>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  
  // Contact message operations
  createContactMessage(message: ContactFormValues): Promise<ContactMessage>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  updateContactMessageReadStatus(id: number, isRead: boolean): Promise<ContactMessage | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private bookings: Map<number, Booking>;
  private contactMessages: Map<number, ContactMessage>;
  private userId: number;
  private bookingId: number;
  private messageId: number;

  constructor() {
    this.users = new Map();
    this.bookings = new Map();
    this.contactMessages = new Map();
    this.userId = 1;
    this.bookingId = 1;
    this.messageId = 1;
    
    // Initialize with admin user
    this.createUser({
      username: "admin",
      password: "eugineray2023", // This should be hashed in a real application
      isAdmin: true
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Booking operations
  async createBooking(bookingData: Omit<BookingFormValues, "agreeToTerms">): Promise<Booking> {
    const id = this.bookingId++;
    const now = new Date();
    
    const booking: Booking = {
      id,
      firstName: bookingData.firstName,
      lastName: bookingData.lastName,
      email: bookingData.email,
      phone: bookingData.phone,
      serviceType: bookingData.serviceType,
      eventDate: bookingData.eventDate,
      location: bookingData.location || "",
      message: bookingData.message || "",
      budget: bookingData.budget,
      status: "pending",
      createdAt: now
    };
    
    this.bookings.set(id, booking);
    return booking;
  }
  
  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }
  
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  
  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    
    if (!booking) {
      return undefined;
    }
    
    const updatedBooking: Booking = {
      ...booking,
      status
    };
    
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }
  
  // Contact message operations
  async createContactMessage(messageData: ContactFormValues): Promise<ContactMessage> {
    const id = this.messageId++;
    const now = new Date();
    
    const message: ContactMessage = {
      id,
      name: messageData.name,
      email: messageData.email,
      subject: messageData.subject,
      message: messageData.message,
      isRead: false,
      createdAt: now
    };
    
    this.contactMessages.set(id, message);
    return message;
  }
  
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }
  
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  
  async updateContactMessageReadStatus(id: number, isRead: boolean): Promise<ContactMessage | undefined> {
    const message = this.contactMessages.get(id);
    
    if (!message) {
      return undefined;
    }
    
    const updatedMessage: ContactMessage = {
      ...message,
      isRead
    };
    
    this.contactMessages.set(id, updatedMessage);
    return updatedMessage;
  }
}

export const storage = new MemStorage();
