-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    referral_code TEXT UNIQUE,
    plan TEXT DEFAULT 'starter',
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- ADMIN USERS
-- =========================
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- VIDEOS
-- =========================
CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title TEXT,
    status TEXT DEFAULT 'queued', -- queued / processing / completed / failed
    prompt TEXT,
    progress INT DEFAULT 0,
    cost DECIMAL DEFAULT 0,
    scheduled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- PAYMENTS / BILLING
-- =========================
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL NOT NULL,
    currency TEXT DEFAULT 'USD',
    stripe_payment_id TEXT,
    plan TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- REFERRALS
-- =========================
CREATE TABLE referrals (
    id SERIAL PRIMARY KEY,
    referrer_id INT REFERENCES users(id) ON DELETE CASCADE,
    referred_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- USAGE LOGS
-- =========================
CREATE TABLE usage_logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    action TEXT, -- e.g., 'signup', 'video_created', 'video_completed'
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- WAITLIST
-- =========================
CREATE TABLE waitlist (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- OPTIONAL: KPI METRICS TABLE (FOR INVESTOR DASHBOARD)
-- =========================
CREATE TABLE metrics (
    id SERIAL PRIMARY KEY,
    total_users INT DEFAULT 0,
    total_videos INT DEFAULT 0,
    total_revenue DECIMAL DEFAULT 0,
    snapshot_at TIMESTAMP DEFAULT NOW()
);
