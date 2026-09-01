# Sample Todo API — Design Inputs

Sample project files for the `/design-api` skill. These files define a simple todo list API and can be fed directly into the skill to generate API design stories and an OpenAPI 3.1.0 specification.

## Files

| File | Purpose |
|---|---|
| `todo-research.md` | Market research — ICPs, needs, benefits, use cases |
| `todo-domain.md` | Domain model — objects, properties, relationships |
| `API-standards.md` | API design standards — REST conventions, error handling, security |
| `OpenAPI-best-practices.md` | OpenAPI spec rules — format, DRY, SDK compatibility |

## Usage

Point the `/design-api` skill at these four files when prompted for inputs.

### API Design Skill installation

`npx skills add paraskakis/skills`

#### Bonus points, add a RateMyOpenAPI API Key for the skill to use:

1. Go to https://docs.ratemyopenapi.com/
2. Click "Pricing" in the top-right, then sign up for a free account
3. Click your profile name (top right) → "Subscription"
4. Scroll down for your API Key

`echo 'export RMOA_API_KEY=your-key-here' >> ~/.zshrc`

`source ~/.zshrc`

### Build a prototype with Replit

Upload the OpenAPI file and paste this prompt:
```
Implement the API server described in the attached OpenAPI file:
Follow the OpenAPI file very closely.
Make sure you use the authentication specified in the OpenAPI file.
Do not add unspecified items in the path like /api or versions like /v1, unless they are present in the OpenAPI file.
Do not implement persistence, logging, analytics, or caching unless specifically instructed. Keep the server as simple as possible.
Also create a simple React web page at the root that serves as an API reference, showing all endpoints with their HTTP methods and descriptions.
```

## License

MIT



