# HalalChain-Certify-Backend

```bash
halalchain-backend/
├── 📁 src/
│   ├── 📁 config/                 # Environment variables and configuration
│   │   └── index.ts
│   ├── 📁 middleware/             # Custom Express middleware
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── error.middleware.ts
│   ├── 📁 models/                 # Database ORM models (e.g., Mongoose, Prisma)
│   │   ├── User.model.ts
│   │   ├── Certification.model.ts
│   │   ├── AISubmission.model.ts
│   │   └── index.ts
│   ├── 📁 types/                  # TypeScript type definitions
│   │   ├── express/index.d.ts     # Extend Request object (e.g., req.user)
│   │   └── global.types.ts
│   ├── 📁 utils/                  # Helper functions and utilities
│   │   ├── logger.ts
│   │   ├── apiResponse.ts
│   │   ├── blockchain.util.ts     # Web3 interaction helpers
│   │   └── ai.client.ts           # Client to call external AI API (e.g., Python service)
│   ├── 📁 services/               # Business logic layer
│   │   ├── user.service.ts
│   │   ├── auth.service.ts
│   │   ├── ai.service.ts          # Orchestrates AI analysis calls
│   │   ├── certification.service.ts
│   │   ├── blockchain.service.ts  # Core logic for minting, events
│   │   ├── supplyChain.service.ts
│   │   └── token.service.ts
│   ├── 📁 controllers/            # Route handlers (Request/Response logic)
│   │   ├── user.controller.ts
│   │   ├── auth.controller.ts
│   │   ├── ai.controller.ts
│   │   ├── certification.controller.ts
│   │   ├── supplyChain.controller.ts
│   │   ├── public.controller.ts   # Handles public endpoints like QR code verification
│   │   └── admin.controller.ts    # Handles admin-only endpoints
│   ├── 📁 routes/                 # Express route definitions
│   │   ├── index.ts               # Main router that combines all routes
│   │   ├── auth.routes.ts
│   │   ├── ai.routes.ts
│   │   ├── certification.routes.ts
│   │   ├── supplyChain.routes.ts
│   │   ├── public.routes.ts
│   │   └── admin.routes.ts
│   ├── 📁 jobs/                   # Scheduled tasks and queues (BullMQ)
│   │   ├── aiAnalysis.job.ts      # Processes async AI requests
│   │   ├── blockchain.job.ts      # Listens for blockchain TX confirmations
│   │   └── expiration.job.ts      # Checks for expiring certificates
│   ├── 📁 scripts/                # One-off scripts (e.g., db migrations, seed data)
│   │   └── seedDatabase.ts
│   ├── 📁 tests/                  # Test files (mirror the src structure)
│   │   ├── unit/
│   │   └── integration/
│   ├── app.ts                     # Express app setup (middleware, routes)
│   └── server.ts                  # Server entry point (starts the app)
├── 📁 .github/                    # GitHub Actions CI/CD workflows
│   └── 📁 workflows/
│       └── ci.yml
├── 📁 docs/                       # Project documentation (API specs, setup guides)
│   └── api.md                     # <-- The file we just created
├── 📁 scripts/                    # Utility scripts for deployment/local dev
├── 📁 uploads/                    # Local uploads directory (for dev, use S3 in prod)
│   └── 📁 temp/
├── .env.example                   # Example environment variables
├── .gitignore
├── package.json
├── tsconfig.json
├── docker-compose.yml             # For local Redis, DB, etc.
└── Dockerfile

```bash
