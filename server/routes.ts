import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { bookingFormSchema, contactFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for handling booking requests
  app.post("/api/bookings", async (req, res) => {
    try {
      // Validate incoming data
      const validatedData = bookingFormSchema.parse(req.body);
      
      // Remove agreeToTerms field as it's not part of the booking schema
      const { agreeToTerms, ...bookingData } = validatedData;
      
      // Store booking in database
      const booking = await storage.createBooking(bookingData);
      
      // Send confirmation response
      res.status(201).json({
        message: "Booking request submitted successfully",
        bookingId: booking.id,
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.message 
        });
      }
      
      // Handle other errors
      console.error("Error creating booking:", error);
      res.status(500).json({ message: "Error processing booking request" });
    }
  });

  // API route for handling contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate incoming data
      const validatedData = contactFormSchema.parse(req.body);
      
      // Store contact message in database
      const message = await storage.createContactMessage(validatedData);
      
      // Send confirmation response
      res.status(201).json({
        message: "Message sent successfully",
        messageId: message.id,
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.message 
        });
      }
      
      // Handle other errors
      console.error("Error creating contact message:", error);
      res.status(500).json({ message: "Error sending message" });
    }
  });

  // API route for fetching bookings (admin-only endpoint)
  app.get("/api/admin/bookings", async (req, res) => {
    try {
      // TODO: Add authentication middleware
      const bookings = await storage.getAllBookings();
      res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Error fetching bookings" });
    }
  });

  // API route for fetching contact messages (admin-only endpoint)
  app.get("/api/admin/messages", async (req, res) => {
    try {
      // TODO: Add authentication middleware
      const messages = await storage.getAllContactMessages();
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ message: "Error fetching contact messages" });
    }
  });

  // API route for updating booking status (admin-only endpoint)
  app.patch("/api/admin/bookings/:id", async (req, res) => {
    try {
      // TODO: Add authentication middleware
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status || !["pending", "confirmed", "completed", "canceled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      
      const updatedBooking = await storage.updateBookingStatus(parseInt(id), status);
      
      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      res.status(200).json(updatedBooking);
    } catch (error) {
      console.error("Error updating booking status:", error);
      res.status(500).json({ message: "Error updating booking status" });
    }
  });

  // API route for marking contact message as read (admin-only endpoint)
  app.patch("/api/admin/messages/:id", async (req, res) => {
    try {
      // TODO: Add authentication middleware
      const { id } = req.params;
      const { isRead } = req.body;
      
      if (typeof isRead !== "boolean") {
        return res.status(400).json({ message: "Invalid isRead value" });
      }
      
      const updatedMessage = await storage.updateContactMessageReadStatus(parseInt(id), isRead);
      
      if (!updatedMessage) {
        return res.status(404).json({ message: "Message not found" });
      }
      
      res.status(200).json(updatedMessage);
    } catch (error) {
      console.error("Error updating message read status:", error);
      res.status(500).json({ message: "Error updating message read status" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
