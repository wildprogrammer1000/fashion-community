INSERT INTO magazines (
    author_id,
    title,
    content,
    image_url,
    brand,
    product_name,
    color,
    size,
    tags,
    buy_link
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
) RETURNING *; 