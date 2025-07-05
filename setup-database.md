# PostgreSQL Database Setup for Group Polling App

## 🗄️ Database Setup Instructions

### 1. Install PostgreSQL

**On macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**On Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**On Windows:**
Download and install from: https://www.postgresql.org/download/windows/

### 2. Create Database and User

Connect to PostgreSQL as the postgres user:

```bash
# On macOS/Linux
sudo -u postgres psql

# Or if you have a local installation
psql postgres
```

Create the database and user:

```sql
-- Create database
CREATE DATABASE group_polling;

-- Create user (replace 'your_password' with a secure password)
CREATE USER poll_user WITH PASSWORD 'your_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE group_polling TO poll_user;

-- Connect to the database
\c group_polling

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO poll_user;

-- Exit
\q
```

### 3. Update Environment Variables

Edit the `.env` file in your project root:

```env
DATABASE_URL="postgresql://poll_user:your_password@localhost:5432/group_polling?schema=public"
```

Replace:
- `poll_user` with your database username
- `your_password` with your database password
- `localhost:5432` with your database host and port (if different)

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run Database Migrations

```bash
npx prisma db push
```

Or if you want to use migrations:

```bash
npx prisma migrate dev --name init
```

### 6. Verify Setup

```bash
npx prisma studio
```

This will open Prisma Studio in your browser where you can view and manage your database.

## 🔧 Troubleshooting

### Connection Issues
- Make sure PostgreSQL is running: `brew services list` (macOS) or `sudo systemctl status postgresql` (Linux)
- Check if the port is correct (default: 5432)
- Verify username and password in the DATABASE_URL

### Permission Issues
- Make sure the user has proper permissions on the database
- Try connecting manually: `psql -h localhost -U poll_user -d group_polling`

### Migration Issues
- If you get schema conflicts, you can reset: `npx prisma migrate reset`
- For development, you can use: `npx prisma db push --force-reset`

## 📊 Database Schema

The app creates three main tables:

1. **polls** - Stores poll information (title, description, slug)
2. **poll_options** - Stores poll options (text, poll_id)
3. **votes** - Stores votes (voter_id, option_id)

Relationships:
- One poll has many options
- One option has many votes
- Each voter can only vote once per option (enforced by unique constraint)

## 🚀 Next Steps

After setting up the database:

1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000`
3. Create your first poll!
4. The data will be stored in PostgreSQL instead of JSON files

## 🔒 Security Notes

- Never commit the `.env` file to version control
- Use strong passwords for database users
- Consider using connection pooling for production
- Set up proper database backups 