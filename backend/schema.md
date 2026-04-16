# Database Schema

## Collection: `users`

```json
{
  "_id": "ObjectId (auto-generated)",
  "name": "String — required, trimmed",
  "email": "String — required, unique, lowercase",
  "password": "String — required, bcrypt hashed, min 6 chars",
  "role": "String — enum: ['admin', 'manager', 'user'], default: 'user'",
  "status": "String — enum: ['active', 'inactive'], default: 'active'",
  "createdBy": "ObjectId — ref: User (nullable)",
  "updatedBy": "ObjectId — ref: User (nullable)",
  "createdAt": "Date — auto by Mongoose timestamps",
  "updatedAt": "Date — auto by Mongoose timestamps"
}
```

## Indexes

| Field   | Type   | Notes              |
|---------|--------|--------------------|
| email   | Unique | Auto by Mongoose   |
| _id     | Primary| Auto by MongoDB    |

## Relationships

- `createdBy` → references `users._id` (who created this user record)
- `updatedBy` → references `users._id` (who last updated this user record)

## Sample Documents

### Admin User
```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Super Admin",
  "email": "admin@example.com",
  "password": "$2a$10$hashedpasswordhere",
  "role": "admin",
  "status": "active",
  "createdBy": null,
  "updatedBy": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Manager User
```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
  "name": "Manager One",
  "email": "manager@example.com",
  "password": "$2a$10$hashedpasswordhere",
  "role": "manager",
  "status": "active",
  "createdBy": "64f1a2b3c4d5e6f7a8b9c0d1",
  "updatedBy": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Regular User
```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d3",
  "name": "Regular User",
  "email": "user@example.com",
  "password": "$2a$10$hashedpasswordhere",
  "role": "user",
  "status": "active",
  "createdBy": "64f1a2b3c4d5e6f7a8b9c0d1",
  "updatedBy": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```