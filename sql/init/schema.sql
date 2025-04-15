CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nickname VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    provider VARCHAR(20) NOT NULL, -- 'kakao', 'google'
    role VARCHAR(20) DEFAULT 'user', -- 'user', 'editor', 'admin'
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_name VARCHAR(100) NOT NULL,
    size VARCHAR(20) NOT NULL,
    recommended_size VARCHAR(20),
    comment TEXT,
    image_url TEXT,
    brand VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS magazines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    brand VARCHAR(100),
    product_name VARCHAR(100),
    color VARCHAR(50),
    size VARCHAR(50),
    tags TEXT[], -- PostgreSQL 배열
    buy_link TEXT,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS editor_approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS magazine_views(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    magazine_id UUID NOT NULL REFERENCES magazines(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id), -- 로그인 사용자면 기록
    ip_address VARCHAR(50),           -- 비회원이면 IP 기반 추적
    user_agent TEXT,
    viewed_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT unique_view_per_hour UNIQUE (magazine_id, user_id, ip_address, viewed_at)
);

-- 빠른 조회를 위한 인덱스
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_magazines_author_id ON magazines(author_id);
CREATE INDEX idx_editor_approvals_user_id ON editor_approvals(user_id);