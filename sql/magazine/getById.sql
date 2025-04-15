SELECT m.*, u.nickname
FROM magazines m
JOIN users u ON m.author_id = u.id
WHERE m.id = $1; 