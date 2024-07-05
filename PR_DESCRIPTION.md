# Migrate MongoDB to PostgreSQL using Drizzle ORM

## Summary
This pull request migrates the Next.js application from using MongoDB to PostgreSQL. The migration involves setting up a PostgreSQL database, defining a relational schema between movies and cast objects using Drizzle ORM and Drizzle Kit, and ensuring the application runs and builds properly with the new setup. All files have been converted to TypeScript.

## Changes
- Set up PostgreSQL database using `neonctl`.
- Added PostgreSQL connection string to `.env.local`.
- Installed necessary dependencies: `drizzle-orm`, `pg`, and `@types/pg`.
- Created schema definition files for `movies` and `cast` tables using Drizzle ORM.
- Converted schema definition files to TypeScript.
- Updated `package.json` and `package-lock.json` to reflect new dependencies.
- Removed `.env.local.example` as part of cleanup.

## Testing
- Ran the application in development mode to ensure it builds and runs correctly with the new PostgreSQL setup.
- Verified that database operations work as expected with PostgreSQL.

## Notes
- The MongoDB dependency is still present in `package.json` and can be removed once the migration is fully verified.
- Sample data provided by the user was used for testing purposes.

## Link to Devin run
https://preview.devin.ai/devin/e6466142455742d3bcbf8bfe9a61ba31

This Devin run was requested by Nikita.

Please review the changes and provide feedback.
