// api/bookings.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Destructure the booking data from the request body
    const { firstName, lastName, email, phone, serviceType, eventDate, location, message, budget } = req.body;

    // Mimic a booking creation (you can replace this with actual logic like database interaction)
    const booking = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      phone,
      serviceType,
      eventDate,
      location,
      message,
      budget,
      status: 'pending',
      createdAt: new Date(),
    };

    // Return the booking data as a response
    res.status(201).json(booking);
  } else {
    // If it's not a POST request, return an error
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
