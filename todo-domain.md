# Todo Domain

## Domain Description:
* A User has Projects (logical groupings like "Work" or "Home").
* A Project contains Tasks. A Task is a to-do item with a title, optional details, a due date, and a priority level.

## Data Objects and Properties:

### Project
- ID (string, UUID) - required
- Name (string) - example: "Work" - required
- Description (string) - example: "Tasks related to my day job"

### Task
- ID (string, UUID) - required
- Title (string) - example: "Write API proposal" - required
- Description (string) - example: "Draft the v1 proposal and share with the team for review"
- Priority (enum: low, medium, high) - example: "medium" - required
- Status (enum: open, completed) - example: "open" - required
- DueDate (date, RFC3339/ISO8601) - example: "2026-06-15"
- ProjectID (string, UUID, reference to Project) - required
- CreatedAt (datetime, RFC3339/ISO8601 UTC) - example: "2026-05-28T10:00:00Z" - required
- CompletedAt (datetime, RFC3339/ISO8601 UTC) - example: "2026-06-01T14:30:00Z"

## Object Relations:
1. A Project has many Tasks.
2. A Task belongs to exactly one Project.
