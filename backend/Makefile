knexfile = ./src/db/knexfile.ts

# Migrations
.PHONY: migrate-make
migrate-make:
	@if [ -z "$(name)" ]; then echo "Usage: make migrate-make name=<migration_name>"; exit 1; fi
	@echo "Creating migration: $(name)"
	npx knex migrate:make $(name) --knexfile $(knexfile)

migrate-latest:
	npx knex migrate:latest --knexfile $(knexfile)

migrate-rollback:
	npx knex migrate:rollback --knexfile $(knexfile)

# Seeds
.PHONY: seed-make
seed-make:
	@if [ -z "$(name)" ]; then echo "Usage: make seed-make name=<seed_name>"; exit 1; fi
	@echo "Creating seed: $(name)"
	npx knex seed:make $(name) --knexfile $(knexfile)

seed-run:
	npx knex seed:run --knexfile $(knexfile)

run-backend:
	npm install
	make migrate-latest
	make seed-run
	npm run dev