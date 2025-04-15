INSERT INTO magazine_views (
    magazine_id,
    user_id,
    ip_address,
    user_agent
) VALUES (
    $1, $2, $3, $4
) ON CONFLICT DO NOTHING;

UPDATE magazines 
SET views = (
    SELECT COUNT(*) 
    FROM magazine_views 
    WHERE magazine_id = $1
)
WHERE id = $1 
RETURNING views; 