SELECT r.*, u.nickname
FROM reviews r
JOIN users u ON r.user_id = u.id
ORDER BY r.created_at DESC 