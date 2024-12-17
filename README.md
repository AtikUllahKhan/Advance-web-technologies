# Advance-web-technologies
QuadraCart - E-Commerce Admin Side

Project Overview

QuadraCart is an e-commerce platform where administrators can manage customers,vendor,Delivery Agent and administrative data. This repository focuses on the admin side of the application, providing functionality for managing admin users, customers,Vendor and Delivery Agent securely.

Features

Admin Management

1.Admins can:

i.Register and log in securely using hashed passwords.
ii.Perform CRUD (Create, Read, Update, Delete) operations on other admin accounts.
iii.Authenticate using JWT (JSON Web Tokens) for secure access.

2.Customer Management

i.After successful admin login, admins can:
ii.Add, update, and delete customer accounts.
iii.View customer details

3.Vendor Management

i.After successful admin login, admins can:
ii.Add, update, and delete Vendor accounts.
iii.View vendor details.

4.Delivery Agent Management

i.After successful admin login, admins can:
ii.Add, update, and delete Delivery Agent accounts.
iii.View delivery agent details.

Authentication and Authorization

The application uses JWT-based authentication to ensure secure access.

Guards are implemented to protect sensitive routes, allowing only authorized admins to perform specific actions.

Technology Stack

1.Backend Framework: NestJS
2.Database: PostgreSQL
3.API: Postman
4.ORM: TypeORM
5.Authentication: JWT and bcrypt for password hashing

Language: TypeScript

Folder Structure
QuadraCart/
├── admin/                           # Admin 
│   ├── dto/                         # Data Transfer Objects for admin
│   ├── entities/                    # Admin entity definitions
│   ├── admin.controller.ts          # Admin controller
│   ├── admin.service.ts             # Admin services
│   ├── admin.module.ts              # Admin module
├── customer/                        # Customer 
│   ├── dto/                         # Data Transfer Objects for customer
│   ├── entities/                    # Customer entity definitions
│   ├── customer.controller.ts       # Customer controller
│   ├── customer.service.ts          # Customer services
│   ├── customer.module.ts           # Customer module
├── auth/                            # Authentication module
│   ├── auth.guard.ts                # Guard for protected routes
├── app.module.ts                    # Root module
├── delivery-agent/                  # Delivery-agent 
│   ├── dto/                         # Data Transfer Objects for delivery-agent
│   ├── entities/                    # Delivery-agent entity definitions
│   ├── delivery-agent.controller.ts # Delivery-agent controller
│   ├── delivery-agent.service.ts    # Delivery-agent services
│   ├── delivery-agen.module.ts      # Delivery-agent module
├── vendor/                          # Vendor 
│   ├── dto/                         # Data Transfer Objects for Vendor
│   ├── entities/                    # Vendor entity definitions
│   ├── vendor.controller.ts         # Vendor controller
│   ├── vendor.service.ts            # Vendor services
│   ├── vendor.module.ts             # Vendor module
 
