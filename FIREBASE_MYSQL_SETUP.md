# RentGear Firebase Auth + MySQL + Vercel Setup

Yes, MySQL is absolutely doable for an online deployment. A common setup is:

- Firebase Authentication for email/password login
- MySQL for reservation and business data
- Vercel Functions for server-side API routes

This project now uses:

- `firebase-client.js` for browser-side Firebase auth
- `api/config.js` for the public Firebase web config
- `api/_lib/firebase-admin.js` for Firebase ID token verification
- `api/_lib/db.js` for the MySQL connection pool
- `api/reservations.js` for inserting reservation records into MySQL

## 1. Create the Firebase project

In Firebase:

1. Create or select a project
2. Add a Web App
3. Copy the Firebase web config
4. Enable `Email/Password` in Authentication

## 2. Create the MySQL table

Run this SQL in your MySQL database when using Firebase Auth for users:

```sql
create table if not exists reservations (
    id int not null auto_increment primary key,
    firebase_uid varchar(255) null,
    car_id int not null,
    pickup_date date not null,
    return_date date not null,
    total_price decimal(10,2) null,
    status varchar(50) not null default 'pending',
    created_at timestamp not null default current_timestamp,
    key reservations_car_id_idx (car_id),
    key reservations_firebase_uid_idx (firebase_uid),
    constraint reservations_car_id_fk foreign key (car_id) references cars (id)
);
```

If your existing `reservations` table still uses `user_id`, migrate it before using `/api/reservations`:

```sql
alter table reservations
    drop foreign key reservations_ibfk_1;

alter table reservations
    drop index user_id;

alter table reservations
    add column firebase_uid varchar(255) null after id;

alter table reservations
    drop column user_id;
```

Your frontend can continue using hardcoded vehicle cards in `app.js`, but `/api/reservations` now resolves the selected vehicle against the MySQL `cars` table and stores the matched `car_id`.

## 3. Vercel environment variables

### Firebase web config

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `FIREBASE_MEASUREMENT_ID`

### Firebase Admin

- `FIREBASE_ADMIN_CLIENT_EMAIL`
- `FIREBASE_ADMIN_PRIVATE_KEY`

### MySQL

- `MYSQL_URL`
- `MYSQL_SSL`

Example MySQL URL:

```env
MYSQL_URL=mysql://username:password@host:3306/database
```

Set `MYSQL_SSL=disable` only if your MySQL host does not require SSL.

## 4. Install dependencies

```bash
npm install
```

This installs:

- `firebase-admin`
- `mysql2`

## 5. Local development

Use:

```bash
vercel dev
```

That gives your static site and `/api/*` routes the same environment variable flow you’ll use on Vercel.

## 6. Reservation API flow

When you later submit a reservation from the frontend:

1. Get the Firebase user token
2. Send it as `Authorization: Bearer <token>`
3. Post the reservation payload to `/api/reservations` with either `carId` or `vehicleName`

Example:

```js
const token = await window.RentGearFirebaseAuth.getCurrentUserToken();

await fetch("/api/reservations", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : ""
    },
    body: JSON.stringify(payload)
});
```

## 7. Recommended next steps

- Add the full reservation form back and post it to MySQL
- Add password reset and email verification in Firebase
- Add validation and rate limiting on `/api/reservations`
- Add an admin page for booking review

## Sources

- Firebase password auth: https://firebase.google.com/docs/auth/web/password-auth
- Firebase web setup: https://firebase.google.com/docs/web/setup
- Firebase Admin token verification: https://firebase.google.com/docs/auth/admin/verify-id-tokens
- MySQL2 docs: https://sidorares.github.io/node-mysql2/docs
- MySQL2 createPool: https://sidorares.github.io/node-mysql2/docs/examples/connections/create-pool
- Vercel Functions: https://vercel.com/docs/functions
- Vercel environment variables: https://vercel.com/docs/projects/environment-variables
