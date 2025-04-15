UPDATE magazines 
SET 
    title = $2,
    content = $3,
    image_url = $4,
    brand = $5,
    product_name = $6,
    color = $7,
    size = $8,
    tags = $9,
    buy_link = $10
WHERE id = $1 
RETURNING *; 