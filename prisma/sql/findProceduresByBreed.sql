SELECT DISTINCT procedures.id, procedures.name
FROM prices
LEFT JOIN procedures ON prices.procedure_id = procedures.id
WHERE prices.breed_id = $1;