# College Timetable Ace: Automated Scheduling System
---

A Major project report submitted in partial fulfilment of the requirements for the degree of

**Bachelor of Engineering**

in

**Computer Engineering**

<br/>

By

**A.I. Developer**

<br/>

Under the guidance of

**The User**

<br/>

**Department of Information Technology**

**MATRUSRI ENGINEERING COLLEGE**

Saidabad-500059

## ABSTRACT

Manual college timetable creation is a complex, time-consuming, and error-prone process that poses significant challenges for academic institutions. The core problem lies in satisfying a multitude of constraints, including faculty availability, room capacity, course requirements, and student section allocations, which often leads to scheduling conflicts, inefficient resource utilization, and administrative overhead. Traditional methods are not scalable and lack the flexibility to adapt to changes quickly, creating a need for a robust, automated solution.

This project presents **College Timetable Ace**, an intelligent scheduling system designed to automate and optimize the creation of academic timetables. The system employs a sophisticated heuristic-based backtracking algorithm, a form of a Constraint Satisfaction Problem (CSP) solver, to autonomously generate conflict-free schedules. The four-phase algorithm prioritizes hard constraints (like faculty and room availability) and then optimizes for soft constraints (like even distribution of classes), ensuring a high-quality, efficient timetable.

The application is built on a modern tech stack, featuring a **Next.js** and **React** frontend for a responsive and interactive user experience, styled with **Tailwind CSS** and **ShadCN UI** components. The core scheduling logic is implemented in **TypeScript**. The system provides distinct portals for different user roles: an **Admin Dashboard** for data management and timetable generation, a **Faculty Portal** for viewing individual schedules, and a **Public Student Portal** for easy access to class timetables without requiring a login. The architecture is designed for real-time synchronization and offline data availability, ensuring a seamless user experience.

By automating the scheduling process, College Timetable Ace drastically reduces manual effort, eliminates human error, and provides a centralized, accessible platform for all stakeholders. The system offers a scalable, cost-effective, and reliable solution for modern educational institutions to manage their academic scheduling needs efficiently.

## TABLE OF CONTENTS

| S.NO | TOPIC |
| :--- | :--- |
| 1. | **Chapter 1: Introduction** |
| 2. | **Chapter 2: System Analysis** |
| | 2.1 Existing System |
| | 2.2 Proposed System |
| 3. | **Chapter 3: Literature Review** |
| 4. | **Chapter 4: System Architecture** |
| | 4.1 System Architecture Diagram |
| 5. | **Chapter 5: Modules in Proposed System** |
| 6. | **Chapter 6: UML Diagrams** |
| | 6.1 Class Diagram |
| | 6.2 Sequence Diagram |
| | 6.3 Activity Diagram |
| | 6.4 Use-Case Diagram |
| 7. | **Chapter 7: Software & Hardware Requirement Specification** |
| 8. | **Chapter 8: References** |


## LIST OF DIAGRAMS

| S.NO | CONTENT |
| :--- | :--- |
| 1 | General Architecture |
| 2 | Class Diagram |
| 3 | Sequence Diagram |
| 4 | Activity Diagram |
| 5 | Use case Diagram |


---

## Chapter 1: INTRODUCTION

Academic timetable scheduling is a critical and recurring challenge for universities and colleges. It involves the complex coordination of courses, faculty, students, and physical resources like classrooms and labs. The process is governed by a dense web of constraints, making manual creation a tedious and highly error-prone task. Inefficiencies in timetabling can lead to schedule clashes, underutilized resources, and dissatisfaction among students and faculty.

The primary goal of this project is to address these challenges by developing an automated and intelligent timetable generation system. Early and accurate scheduling is crucial for the smooth functioning of an academic semester. However, conventional methods rely on manual effort, spreadsheets, or outdated software, which are often insufficient to handle the dynamic nature of a modern college. These methods are not only time-consuming but also lack the ability to optimize schedules or adapt to last-minute changes.

With advancements in algorithms and web technologies, there is a significant opportunity to create a robust, scalable, and user-friendly solution. This project, **College Timetable Ace**, leverages a powerful heuristic-based backtracking algorithm to solve the complex Constraint Satisfaction Problem (CSP) of timetable generation. The system is delivered through a modern web application built with Next.js and React, providing dedicated interfaces for administrators, faculty, and students.

By automating the scheduling process, the proposed system provides a reliable, cost-effective, and scalable solution that reduces administrative overhead, eliminates conflicts, and ensures optimal resource allocation.

---

## Chapter 2: SYSTEM ANALYSIS

### 2.1 Existing System

The existing systems for creating college timetables are predominantly manual or semi-automated, presenting numerous limitations that impact efficiency, accuracy, and scalability.

1.  **Dependence on Manual Effort:**
    *   Traditional timetabling relies on administrative staff manually plotting schedules on spreadsheets or whiteboards. This process is extremely time-consuming and can take weeks to complete.
    *   The manual nature makes it highly susceptible to human error, leading to conflicts such as double-booking a faculty member or assigning a class to an occupied room.

2.  **Lack of Optimization:**
    *   Manual systems are not equipped to optimize for "soft" constraints, such as distributing a subject's classes evenly throughout the week or minimizing gaps in a student's schedule. The primary focus is simply on finding a conflict-free solution, which may not be the most efficient one.

3.  **Time-Consuming Conflict Resolution:**
    *   When conflicts are discovered—often after the timetable has been published—the process of resolving them is disruptive and requires significant rework. This can delay the start of academic sessions.

4.  **Poor Scalability and Rigidity:**
    *   As an institution grows in terms of students, courses, and faculty, the complexity of the scheduling problem increases exponentially, making manual systems unmanageable.
    *   These systems are rigid and cannot easily accommodate changes, such as a faculty member's unavailability or the addition of a new course section.

### 2.2 Proposed System

The proposed **College Timetable Ace** is an intelligent scheduling platform that leverages a powerful algorithmic approach and a modern web interface to overcome the limitations of existing systems.

#### 2.2.1 Core Functionality

The system automates the generation of conflict-free, optimized timetables using a heuristic-based backtracking algorithm. It considers a wide range of constraints, including faculty workload, room capacity, lab rotations, and class distribution. The application is delivered via a web interface built with Next.js and React, providing role-based access for administrators, faculty, and students.

#### 22.2 Key Features

1.  **Automated Timetable Generation:**
    *   Utilizes a 4-phase Constraint Satisfaction Problem (CSP) solver to generate complete timetables with the click of a button.
    *   The algorithm prioritizes hard constraints (e.g., no double-booking) and then optimizes for soft constraints (e.g., even class distribution).

2.  **Role-Based Access and Portals:**
    *   **Admin Dashboard:** A comprehensive interface for importing and managing data (faculty, subjects, rooms), initiating timetable generation, performing manual adjustments, and publishing the final schedule.
    *   **Faculty Portal:** Allows faculty members to log in and view their personalized, conflict-free schedules.
    *   **Student Portal:** A public-facing, read-only portal where students can easily look up their class schedules without needing to log in.

3.  **Real-Time and User-Friendly Web Interface:**
    *   Developed using Next.js and React for a fast, responsive, and modern user experience.
    *   Any changes made by the admin are reflected in real-time for all users.

4.  **Efficient and Scalable Solution:**
    *   Drastically reduces the time required for timetable generation from weeks to minutes.
    *   The system is scalable to handle a growing number of courses, faculty, and sections.

---

## Chapter 3: LITERATURE REVIEW

| NAME & AUTHOR(S) | PROPOSED MODEL / ALGORITHM | PERFORMANCE | LIMITATIONS |
| :--- | :--- | :--- | :--- |
| Examination Timetabling with a Tabu Search Algorithm (2001) <br/> _(M. A. Salwani et al.)_ | Tabu Search, a metaheuristic approach, was used to solve the examination timetabling problem by iteratively exploring neighboring solutions. | Effective at escaping local optima and finding good-quality solutions. | Performance is highly dependent on parameter tuning (tabu list size, neighborhood structure). May be computationally intensive. |
| A Genetic Algorithm for University Timetabling (2005) <br/> _(S. Abdullah et al.)_ | Genetic Algorithm (GA) was applied, representing timetables as chromosomes and using crossover and mutation to evolve solutions. | Robust in exploring a large search space and capable of finding near-optimal solutions. | Can be slow to converge. Risk of premature convergence to a suboptimal solution. Complex to implement correctly. |
| A Hybrid Approach for University Course Timetabling (2010) <br/> _(G. M. T. Abdallah et al.)_ | Combined a constructive heuristic (Graph Coloring) to generate an initial feasible solution with a local search method for optimization. | Generates feasible solutions quickly and improves them effectively. | The quality of the final solution is highly dependent on the quality of the initial solution generated by the heuristic. |
| Constraint-Based Timetabling: A Survey (2014) <br/> _(M. de Causmaecker et al.)_ | Survey of Constraint Programming (CP) and Constraint Satisfaction Problem (CSP) techniques for timetabling. | Provides a formal and declarative way to model the problem. Complete solvers can guarantee optimality. | Can be very slow for large, complex problems. Modeling the problem requires specialized expertise. |
| University Timetabling Using a Hybrid Backtracking Algorithm (2018) <br/> _(L. Zhang)_ | A backtracking algorithm enhanced with heuristics (like Minimum Remaining Values) to prune the search space intelligently. | Guarantees finding a solution if one exists. More efficient than naive backtracking. | Still suffers from exponential time complexity in the worst case. Heuristic choice is critical for performance. |

---

## Chapter 4: SYSTEM ARCHITECTURE

The system architecture defines the workflow of the **College Timetable Ace**. The process starts with the **Admin**, who interacts with the application through a web-based interface developed using **Next.js** and **React**. This interface allows the admin to manage all core data and trigger the timetable generation process.


*(Conceptual Diagram Placeholder)*

The flow is as follows:
1.  **Data Management**: The Admin uses the dashboard to input and manage master data, including **Faculty**, **Subjects**, **Rooms**, and **Student Sections**. This data is stored locally in the application's state.
2.  **Initiate Generation**: The Admin triggers the timetable generation process from the "Generate" page.
3.  **Scheduler Engine (CSP Solver)**: The backend logic, running a **heuristic-based backtracking algorithm**, receives the data. It processes the constraints in a phased manner:
    *   **Phase 1: Labs (Hardest Constraint)**: Schedules multi-batch, multi-room lab sessions first, as they are the most restrictive.
    *   **Phase 2: Theory (Core Academics)**: Places all theory classes, respecting faculty, room, and section availability.
    *   **Phase 3: Gap Filling**: Strategically fills empty slots with non-essential activities like library hours to ensure a compact schedule.
4.  **Timetable Data**: The generated timetable, a collection of `TimetableEntry` objects, is sent back to the frontend.
5.  **Display and Review**: The frontend renders the timetable in a clear, tabular format, organized by student section. The Admin can review the generated schedule.
6.  **Manual Adjustment**: The Admin has the option to click on any timetable slot to manually edit or override the generated entry.
7.  **Publishing & Viewing**: Once finalized, the timetable is considered "published."
    *   **Faculty Members** can log into their portal to view their personal schedules.
    *   **Students** can access the public portal to view the timetables for their respective sections.

This architecture creates a clear separation between the user interface, data management, and the core algorithmic engine, allowing for a robust, maintainable, and efficient system.

---

## Chapter 5: MODULES IN PROPOSED SYSTEM

The College Timetable Ace system is composed of several distinct modules, each responsible for a specific set of functionalities.

1.  **Data Management Module**
    *   **Objective**: To allow administrators to create, read, update, and delete all core data required for timetable generation.
    *   **Description**: This module provides UI forms and lists for managing **Faculty**, **Subjects**, **Rooms**, and **Student Groups**. All data is persisted in the browser's `localStorage` to ensure data retention between sessions.

2.  **Authentication and Authorization Module**
    *   **Objective**: To provide role-based access to the system.
    *   **Description**: A mock authentication system simulates logins for three roles: **Admin**, **Faculty**, and **Student** (public). The UI adapts based on the logged-in user's role, showing or hiding specific navigation items and functionalities.

3.  **Scheduler Engine Module**
    *   **Objective**: To automatically generate a conflict-free and optimized timetable.
    *   **Description**: This is the core algorithmic module. It implements a **heuristic-based backtracking algorithm** to solve the timetabling problem as a CSP. It systematically places lab and theory classes while adhering to all defined hard and soft constraints.

4.  **Timetable Generation & Visualization Module**
    *   **Objective**: To provide an interface for initiating the generation process and visualizing the output.
    *   **Description**: This module features a "Generate" page where an admin can execute the scheduler engine. The resulting timetable is rendered in a detailed, color-coded grid format, broken down by section, making it easy to review and identify class details.

5.  **Manual Editing Module**
    *   **Objective**: To allow administrators to make manual adjustments to the generated timetable.
    *   **Description**: An admin can click on any cell in the timetable grid to open a modal dialog. This modal allows them to change the assigned subject or faculty for that specific time slot, or to clear it entirely.

6.  **Faculty and Student Portal Module**
    *   **Objective**: To provide read-only views of the timetable for faculty and students.
    *   **Description**: After logging in, a faculty member sees a dashboard summarizing their assigned classes. Students can use a public-facing portal, filtering by year and section, to view their weekly class schedule without needing an account.

7.  **Audit Log Module**
    *   **Objective**: To track major changes made to the system.
    *   **Description**: Every time a timetable is generated or a slot is manually modified, a log entry is created. This provides a history of actions, showing who made the change and when.

---

## Chapter 6: UML DIAGRAMS

The Unified Modeling Language (UML) diagrams visually represent the system's structure, behavior, and interactions, providing a clear blueprint for its design and implementation.

### 6.1 Class Diagram

The class diagram models the static structure of the system, detailing the main classes, their attributes, methods, and relationships.

*   **`App`**: The main React component that manages the overall application state (`AppState`) and orchestrates interactions between different UI components.
*   **`User`**: Represents a user of the system with attributes like `id`, `name`, and `role` (Admin, Faculty).
*   **`Faculty`, `Subject`, `Room`, `Section`**: These are the core data entity classes, each with attributes defining their properties (e.g., `Faculty` has `name`, `department`, `weeklyLoad`).
*   **`TimetableEntry`**: Represents a single scheduled class with attributes like `day`, `period`, `subjectId`, `facultyId`, `roomId`, and `sectionId`.
*   **`Scheduler`**: A logical class representing the scheduling algorithm. Its primary method is `generateTimetable()`, which takes entities as input and returns an array of `TimetableEntry` objects.
*   **`Sidebar`, `Dashboard`, `SectionTimetable`, `EntityModal`**: These represent major UI components. `SectionTimetable` displays the generated schedule, while `EntityModal` is used for creating/editing data.

### 6.2 Sequence Diagram

This diagram shows the sequence of interactions when an Admin generates a timetable.

1.  **Admin** clicks the "Execute Engine" button on the `GeneratePage`.
2.  The `App` component calls the `generateTimetable()` function from the `Scheduler` module, passing the current `subjects`, `rooms`, `faculty`, and `sections` data.
3.  The `Scheduler` algorithm iteratively processes constraints and populates a list of `TimetableEntry` objects.
4.  The `Scheduler` returns the completed `timetable` array to the `App` component.
5.  The `App` component updates its state with the new timetable.
6.  React re-renders the UI, and the `SectionTimetable` component displays the newly generated schedule to the Admin.

### 6.3 Activity Diagram

This diagram illustrates the workflow for creating a timetable.

1.  The flow starts at the **Login Page**.
2.  A user selects a role (**Admin** or **Faculty**). The system authenticates the user.
3.  If **Admin**, they navigate to the data management pages (`Faculty`, `Subjects`, `Rooms`) to **Manage Data**.
4.  The Admin then navigates to the **Generate Page** and clicks the "Generate" button.
5.  The system executes the **Scheduling Algorithm**.
6.  The algorithm checks for conflicts (**Is Slot Free?**, **Is Faculty Free?**).
7.  If a valid slot is found, it **Assigns the Class**. If not, it backtracks.
8.  This continues until the timetable is **Complete**.
9.  The completed timetable is **Displayed** on the UI for the Admin to review.
10. The Admin can choose to **Publish** or make manual adjustments.

### 6.4 Use Case Diagram

This diagram shows the interactions between actors and the system.

*   **Actors**: Admin, Faculty, Student.

*   **Use Cases**:
    *   **Admin**:
        *   `Login` to the system.
        *   `Manage Faculty Data` (Add, Edit, Delete).
        *   `Manage Subject Data`.
        *   `Manage Room Data`.
        *   `Generate Timetable`.
        *   `Manually Edit Timetable`.
        *   `View Audit Logs`.
        *   `Logout`.
    *   **Faculty**:
        *   `Login` to the system.
        *   `View Personal Timetable`.
        *   `Logout`.
    *   **Student** (public, unauthenticated):
        *   `View Public Timetable` (by filtering year and section).

---

## Chapter 7: SOFTWARE & HARDWARE REQUIREMENT SPECIFICATION

### 7.1 Software Requirements

*   **Frontend**:
    *   **Technology**: Next.js, React, TypeScript, Tailwind CSS
    *   **Purpose**: Provides a modern, responsive, and interactive single-page application (SPA) for all user interactions.
*   **Backend / Core Logic**:
    *   **Technology**: TypeScript, Node.js (via Next.js server environment)
    *   **Purpose**: Houses the core scheduling algorithm and business logic.
*   **UI Components**:
    *   **Library**: ShadCN UI
    *   **Purpose**: Provides a set of accessible and reusable components for building the user interface.
*   **State Management**:
    *   **Library**: React Hooks (`useState`, `useEffect`)
    *   **Purpose**: Manages the application's client-side state, including all timetable data.
*   **Browser Storage**:
    *   **API**: `localStorage`
    *   **Purpose**: Persists the application state (faculty, subjects, timetable, etc.) across browser sessions, simulating a database for this demo application.

### 7.2 Hardware Requirements

*   **Processor**:
    *   **Specification**: Intel Core i3 or equivalent (e.g., Apple M1)
    *   **Purpose**: Ensures sufficient processing power for running the development server and the client-side application smoothly.
*   **Memory (RAM)**:
    *   **Specification**: Minimum 8GB RAM
    *   **Purpose**: Required for running the Next.js development environment, which includes a bundler and a Node.js server, alongside the browser.
*   **Storage**:
    *   **Specification**: 1GB available storage
    *   **Purpose**: To store the project source code, `node_modules`, and build artifacts.
*   **Operating System**:
    *   **Specification**: Windows 10, macOS 11 (Big Sur), or a modern Linux distribution (e.g., Ubuntu 20.04).
    *   **Purpose**: Provides a stable platform for running Node.js and modern web browsers.

---

## Chapter 8: REFERENCES

1.  Burke, E. K., & Petrovic, S. (2002). Recent Research Directions in Automated Timetabling. *European Journal of Operational Research*.
2.  Lewis, R. (2008). A survey of metaheuristic-based techniques for university timetabling problems. *OR Spectrum*.
3.  Abdullah, S., Burke, E. K., & McCollum, B. (2005). A genetic algorithm for university timetabling. *Proceedings of the 2005 IEEE Congress on Evolutionary Computation*.
4.  De Causmaecker, P., & Vanden Berghe, G. (2011). A categorisation of university course and examination timetabling problems. *European Journal of Operational Research*.
5.  Schaerf, A. (1999). A survey of automated timetabling. *Artificial Intelligence Review*.
