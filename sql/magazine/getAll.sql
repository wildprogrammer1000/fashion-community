SELECT m.*, u.nickname
    FROM magazines m
JOIN users u ON m.author_id = u.id
ORDER BY m.created_at DESC
LIMIT 6; 