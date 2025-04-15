SELECT r.*, u.nickname
FROM reviews r
JOIN users u ON r.user_id = u.id
WHERE r.id = $1 