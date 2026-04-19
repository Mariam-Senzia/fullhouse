# Fullhouse

Fullhouse is a full-stack event ticketing platform where users can browse upcoming events, add tickets to a cart, and complete purchases through a secure payment gateway. Confirmed bookings trigger an automated email with a PDF ticket and a unique QR code for check-in at the door.

---

## Tech Stack

**Frontend** - React, TypeScript, Vite, Tailwind CSS, Zustand, Swiper, React Router

**Backend** - Flask, SQLAlchemy, Flask-JWT-Extended, Flask-Migrate

**Integrations** - PesaPal for payments, Brevo for transactional emails, Cloudinary for image and QR code storage, WeasyPrint for PDF generation

**Deployed on** - Render (backend) and Vercel (frontend)

---

## Features

- Event listing with filtering, sorting, search and pagination
- Cart and checkout as guest support
- Autofill for logged-in users at checkout
- JWT authentication with access and refresh tokens
- Payment processing via PesaPal (M-PESA, Visa, Mastercard, Airtel Money)
- Automated booking confirmation email with a branded PDF ticket
- Unique QR code per booking for event check-in

---

## Architecture

- Resource-based backend structure using Flask-RESTful
- Server-side pagination with Flask-SQLAlchemy
- Zustand with persistence middleware for cart and auth state
- React Router for client-side navigation with Vercel rewrite rules
- PesaPal webhook handles payment verification, booking status update and confirmation email
