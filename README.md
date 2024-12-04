## Environment Variable

add `DB_URI` variable value in .env file at root level

## Start Development server

- `yarn`
- `yarn start`

## Documentation

Access swagger documentation at `/api-docs`

## Approach

- I Have septate out modules for Book and Topic
- Request was validated by DTos 
- Added features like pagination and filters
- Used class validators for required variables and data types and error handling
- Faced challenges in adding filters for topic Ids because we wanted to handle multiple ids
