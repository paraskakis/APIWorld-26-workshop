# Todo API — Stories

## Theme 1: Tasks

#### Story 1.1: List Tasks

**As a** user,
**I want** to list my tasks, optionally filtered by project or completion status,
**So that** I can see what's due without manually sorting through everything.

* **Method:** `GET`
* **Resource:** `/tasks`
* **Parameters:**
  * `projectId` (string UUID, optional, query): Filter tasks belonging to a specific project.
  * `status` (enum: open, completed; optional, query): Filter tasks by completion status.

#### Story 1.2: Create Task

**As a** user,
**I want** to create a new task with a title and optional description, due date, and priority,
**So that** I can quickly capture a to-do before I forget it.

* **Method:** `POST`
* **Resource:** `/tasks`
* **Parameters:**
  * `title` (string, required, body): The task's title.
  * `description` (string, optional, body): Additional detail about the task.
  * `dueDate` (date, optional, body): When the task is due.
  * `priority` (enum: low, medium, high; optional, body): The task's priority. Defaults to `medium` if omitted.
  * `projectId` (string UUID, required, body): The project this task belongs to.

#### Story 1.3: Get Task

**As a** user,
**I want** to view the details of a specific task,
**So that** I can see everything about it before acting on it.

* **Method:** `GET`
* **Resource:** `/tasks/{taskId}`
* **Parameters:**
  * `taskId` (string UUID, required, path): The task to retrieve.

#### Story 1.4: Update Task

**As a** user,
**I want** to update a task's fields — including marking it complete or reopening it,
**So that** I can keep my task list accurate and see my progress.

* **Method:** `PUT`
* **Resource:** `/tasks/{taskId}`
* **Parameters:**
  * `taskId` (string UUID, required, path): The task to update.
  * `title` (string, required, body): The task's title.
  * `description` (string, optional, body): Additional detail about the task.
  * `dueDate` (date, optional, body): When the task is due.
  * `priority` (enum: low, medium, high; required, body): The task's priority.
  * `status` (enum: open, completed; required, body): Set to `completed` to mark done, or `open` to reopen.
  * `projectId` (string UUID, required, body): The project this task belongs to.

#### Story 1.5: Delete Task

**As a** user,
**I want** to delete a task,
**So that** I can remove items I no longer need to track.

* **Method:** `DELETE`
* **Resource:** `/tasks/{taskId}`
* **Parameters:**
  * `taskId` (string UUID, required, path): The task to delete.

## Theme 2: Projects

#### Story 2.1: List Projects

**As a** user,
**I want** to list all my projects,
**So that** I can see how my work is organized.

* **Method:** `GET`
* **Resource:** `/projects`
* **Parameters:** None.

#### Story 2.2: Get Project

**As a** user,
**I want** to view the details of a specific project,
**So that** I can see its name and description before acting on it or its tasks.

* **Method:** `GET`
* **Resource:** `/projects/{projectId}`
* **Parameters:**
  * `projectId` (string UUID, required, path): The project to retrieve.

#### Story 2.3: Create Project

**As a** user,
**I want** to create a new project with a name and optional description,
**So that** I can group related tasks — work, personal, or side-project — without them bleeding together.

* **Method:** `POST`
* **Resource:** `/projects`
* **Parameters:**
  * `name` (string, required, body): The project's name.
  * `description` (string, optional, body): Additional detail about the project.

#### Story 2.4: List Tasks in Project

**As a** user,
**I want** to list all tasks within a specific project,
**So that** I can focus on one area of my work at a time.

* **Method:** `GET`
* **Resource:** `/projects/{projectId}/tasks`
* **Parameters:**
  * `projectId` (string UUID, required, path): The project whose tasks to list.

#### Story 2.5: Update Project

**As a** user,
**I want** to update a project's name or description,
**So that** I can keep my project organization current.

* **Method:** `PUT`
* **Resource:** `/projects/{projectId}`
* **Parameters:**
  * `projectId` (string UUID, required, path): The project to update.
  * `name` (string, required, body): The project's name.
  * `description` (string, optional, body): Additional detail about the project.

#### Story 2.6: Delete Project

**As a** user,
**I want** to delete a project,
**So that** I can remove groupings I no longer need.

* **Method:** `DELETE`
* **Resource:** `/projects/{projectId}`
* **Parameters:**
  * `projectId` (string UUID, required, path): The project to delete.

## Design Decisions

* **Authentication:** API Key, sent in the `Authorization` header using the `Bearer` scheme (per API standards — never `X-Api-Key`).
* **Task completion:** "Mark complete/reopen" and "Update task" are the same operation (`PUT /tasks/{taskId}`), since PUT is a full replacement and there's no multi-step orchestration to justify a separate outcome endpoint.
* **Task priority:** Optional on creation, defaulting server-side to `medium`; required thereafter (domain and response always carry a value).
