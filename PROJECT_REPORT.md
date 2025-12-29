# A Web-Based Platform for Automated College Timetable Generation

A Major project report submitted in partial fulfilment of the requirements for the degree of

**Bachelor of Engineering**

in

**Information Technology**

<br/>

By

**B. Praveen (1608-22-737-039)**
**K. Anudeep (1608-22-737-043)**
**R. Abhiram (1608-22-737-055)**

<br/>

Under the guidance of

**Dr. J. Srinivas**
Associate Professor

<br/>

**Department of Information Technology**

**MATRUSRI ENGINEERING COLLEGE**

Saidabad-500059

## ABSTRACT

Timetable generation is one of the most important yet complex administrative processes in academic institutions, as it directly affects students, faculty members, and overall academic efficiency. Conventional timetable preparation methods are largely manual or semi-automated, requiring significant time and effort while still being prone to errors such as overlapping classes, improper classroom allocation, uneven faculty workload, and difficulties in accommodating last-minute changes. As institutions expand in terms of departments, courses, and student strength, these challenges become more severe and difficult to manage effectively.

This project proposes a Web-Based Platform for Automated College Timetable Generation that aims to simplify and modernize the scheduling process through automation. The system employs a sophisticated heuristic-based backtracking algorithm, a form of a Constraint Satisfaction Problem (CSP) solver, to automatically generate accurate and conflict-free timetables by considering multiple parameters such as subjects, faculty availability, classroom capacity, and predefined time slots. By eliminating manual intervention, the platform significantly reduces administrative workload while improving reliability and consistency in scheduling.

The application is built on a modern tech stack, featuring a **Next.js** and **React** frontend for a responsive and interactive user experience, styled with **Tailwind CSS** and **ShadCN UI** components. The core scheduling logic is implemented in **TypeScript**. The system provides distinct portals for different user roles: an **Admin Dashboard** for data management and timetable generation, a **Faculty Portal** for viewing individual schedules, and a **Public Student Portal** for easy access to class timetables without requiring a login. The architecture is designed for real-time synchronization and offline data availability, ensuring a seamless user experience.

## TABLE OF CONTENTS

| S.NO | TOPIC                                             | PAGE |
| :--- | :------------------------------------------------ | :--- |
| 1.   | **Chapter 1: Introduction**                       | 4    |
| 2.   | **Chapter 2: System Analysis**                    | 5    |
|      | 2.1 Existing System                               | 5    |
|      | 2.2 Proposed System                               | 5    |
| 3.   | **Chapter 3: Literature Review**                  | 6    |
| 4.   | **Chapter 4: System Architecture**                | 7    |
|      | 4.1 System Architecture Diagram                   | 7    |
| 5.   | **Chapter 5: Modules in Proposed System**         | 8    |
| 6.   | **Chapter 6: UML Diagrams**                       | 10   |
|      | 6.1 Class Diagram                                 | 10   |
|      | 6.2 Use-Case Diagram                              | 11   |
|      | 6.3 Activity Diagram                              | 11   |
|      | 6.4 Sequence Diagram                              | 12   |
| 7.   | **Chapter 7: Software & Hardware Requirement Specification** | 13   |
| 8.   | **Chapter 8: References**                         | 15   |


## LIST OF DIAGRAMS

| S.NO | CONTENT                | PAGE |
| :--- | :--------------------- | :--- |
| 1    | General Architecture   | 7    |
| 2    | Class Diagram          | 10   |
| 3    | Use-Case Diagram       | 11   |
| 4    | Activity Diagram       | 11   |
| 5    | Sequence Diagram       | 12   |

---

## Chapter 1: INTRODUCTION

Educational institutions depend heavily on well-organized academic timetables to ensure the smooth conduct of teaching and learning activities. A timetable defines the systematic allocation of subjects, faculty members, classrooms, and time slots, and it plays a crucial role in maintaining academic discipline and operational efficiency. An effective timetable ensures optimal utilization of institutional resources while providing convenience and clarity to students and faculty alike.

Despite its importance, timetable generation remains a challenging task in many colleges and universities. Traditional methods largely rely on manual planning or spreadsheet-based approaches, which are time-consuming and highly prone to errors. Common problems include overlapping classes, improper allocation of classrooms, unequal distribution of faculty workload, and difficulty in handling changes caused by holidays, faculty leave, or academic events. These challenges increase administrative workload and often result in confusion among stakeholders. With the advancement of information technology, there is a growing need for automated systems that can handle complex scheduling requirements efficiently.

The **Web-Based Platform for Automated College Timetable Generation (Timetable MECS)** is designed to address these issues by providing an intelligent and user-friendly scheduling solution. The system automatically generates conflict-free timetables using a heuristic-based backtracking algorithm and predefined constraints, ensuring efficient allocation of faculty, classrooms, and time slots. It also supports role-based access for administrators, faculty, and students, enabling each user to interact with the system according to their responsibilities.

By integrating modern web technologies and a scalable system architecture, the proposed platform improves administrative efficiency, reduces errors, and offers flexibility for rescheduling and event management. The system ultimately aims to support smart academic administration and enhance the overall educational experience.

---

## Chapter 2: SYSTEM ANALYSIS

### 2.1 Existing System

The existing college timetable generation systems have several limitations that affect academic efficiency and administrative productivity.

*   **Manual and Time-Consuming Process**: Traditional timetable preparation is carried out manually or using basic spreadsheet tools. This requires extensive planning, repeated adjustments, and continuous coordination, making the process slow and labor-intensive.
*   **High Probability of Scheduling Conflicts**: Manual scheduling often leads to overlapping classes, double allocation of faculty members, and improper classroom usage. Identifying and correcting these conflicts requires additional effort and time.
*   **Limited Flexibility in Handling Changes**: Existing systems struggle to handle sudden changes such as faculty leave, holidays, examinations, or special events. Any modification usually requires reworking large portions of the timetable.
*   **Lack of Scalability and Optimization**: As institutions grow, managing timetables for multiple departments becomes difficult. Manual methods cannot optimize for soft constraints like minimizing gaps in schedules or ensuring even class distribution.

### 2.2 Proposed System

The proposed system is a Web-Based Platform for Automated College Timetable Generation designed to overcome the limitations of existing manual scheduling methods and provide an efficient, accurate, and scalable solution for academic institutions.

#### 2.2.1 Core Functionality

The core functionality of the platform is to automate and optimize the academic scheduling process using a heuristic-based backtracking algorithm. It handles hard constraints (e.g., faculty availability) and soft constraints (e.g., minimizing gaps) to produce a high-quality timetable.

#### 2.2.2 Key Features

*   **Automated Timetable Generation**: Utilizes a powerful CSP solver to generate conflict-free timetables in minutes, drastically reducing manual effort.
*   **Multi-User Role-Based Access**: Provides dedicated portals for Admins (data management, generation), Faculty (viewing personal schedules), and Students (public access to class timetables).
*   **Real-Time and User-Friendly Web Interface**: Built with Next.js and React for a modern, responsive experience. Changes made by the admin are reflected instantly for all users.
*   **Flexible Manual Adjustments**: Allows administrators to manually override or edit any slot in the generated timetable, providing full control.
*   **Scalability and Performance**: The system is designed to handle the growing complexity of an academic institution without a decline in performance.

---

## Chapter 3: LITERATURE REVIEW

| NAME & AUTHOR(S)                                                                                       | PROPOSED MODEL / ALGORITHM                                                                              | PERFORMANCE                                                                                               | LIMITATIONS                                                                                             |
| :----------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| Automated Timetabling System for University Course (2021)<br/>_(Mrunmayee V. Rane et al.)_               | Rule-based automated timetable generation using hard and soft constraints implemented in Python.        | Produces conflict-free timetables with efficient execution time.                                          | Limited to desktop-based use, lacks web scalability, and requires manual configuration for institutions.  |
| A Genetic Algorithm for University Timetabling (2005)<br/>_(S. Abdullah et al.)_                          | Genetic Algorithm (GA) was applied, representing timetables as chromosomes and using crossover and mutation. | Robust in exploring a large search space and capable of finding near-optimal solutions.                   | Can be slow to converge. Risk of premature convergence to a suboptimal solution.                        |
| A Hybrid Approach for University Course Timetabling (2010)<br/>_(G. M. T. Abdallah et al.)_              | Combined a constructive heuristic (Graph Coloring) with a local search method for optimization.         | Generates feasible solutions quickly and improves them effectively.                                       | The quality of the final solution is highly dependent on the quality of the initial solution.           |
| Constraint-Based Timetabling: A Survey (2014)<br/>_(M. de Causmaecker et al.)_                           | Survey of Constraint Programming (CP) and Constraint Satisfaction Problem (CSP) techniques.             | Provides a formal and declarative way to model the problem. Complete solvers can guarantee optimality.    | Can be very slow for large, complex problems. Modeling the problem requires specialized expertise.        |
| University Timetabling Using a Hybrid Backtracking Algorithm (2018)<br/>_(L. Zhang)_                     | A backtracking algorithm enhanced with heuristics (like Minimum Remaining Values) to prune the search space. | Guarantees finding a solution if one exists. More efficient than naive backtracking.                      | Still suffers from exponential time complexity in the worst case. Heuristic choice is critical.       |
| Timetable Generator Using Genetic Algorithm (2023)<br/>_(Sahil Sarnaik et al.)_                           | Automated timetable generation using Genetic Algorithm with adaptive mutation and crossover.              | Generates near-optimal, conflict-free timetables with improved efficiency.                                | Does not guarantee a 100% optimal solution; performance depends on constraint tuning.                   |

---

## Chapter 4: SYSTEM ARCHITECTURE

This architecture represents an Automated Timetable Generation System designed for academic institutions. The process begins with the **Admin** accessing the system through a web interface built using **Next.js** and **React**, leading to a centralized admin dashboard. From here, the admin manages master data such as faculty details, subjects, rooms, and student sections. Once the required data is configured, the admin triggers the timetable generation process. The dashboard acts as the control center for both data management and timetable operations.

*(Conceptual Diagram Placeholder)*

The core of the system is the scheduler engine based on a **Constraint Satisfaction Problem (CSP) solver**, which generates the timetable in multiple phases. Phase 1 handles lab scheduling with strict hard constraints, followed by theory class scheduling in Phase 2, and optimal gap filling in Phase 3. The generated timetable entries are then displayed in a section-wise frontend view for review. Admins can manually edit and approve the timetable before final publication. Once published, the timetable is made available through faculty and student portals, providing personalized schedules for faculty and section-wise timetables for students.

---

## Chapter 5: MODULES IN PROPOSED SYSTEM

The Timetable MECS system is composed of several distinct modules, each responsible for a specific set of functionalities.

1.  **Data Management Module**
    *   **Objective**: To allow administrators to create, read, update, and delete all core data required for timetable generation.
    *   **Description**: This module provides UI forms and lists for managing **Faculty**, **Subjects**, **Rooms**, and **Student Groups**.

2.  **Authentication and Authorization Module**
    *   **Objective**: To provide role-based access to the system.
    *   **Description**: A mock authentication system simulates logins for three roles: **Admin**, **Faculty**, and **Student** (public).

3.  **Scheduler Engine Module**
    *   **Objective**: To automatically generate a conflict-free and optimized timetable.
    *   **Description**: This core module implements a **heuristic-based backtracking algorithm** to solve the timetabling CSP. It places lab and theory classes while adhering to all defined constraints.

4.  **Timetable Generation & Visualization Module**
    *   **Objective**: To provide an interface for initiating generation and visualizing the output.
    *   **Description**: This module features a "Generate" page where an admin can run the scheduler. The resulting timetable is rendered in a detailed, color-coded grid format.

5.  **Manual Editing Module**
    *   **Objective**: To allow administrators to make manual adjustments to the generated timetable.
    *   **Description**: An admin can click on any cell in the timetable grid to open a modal and change the assigned subject or faculty.

6.  **Faculty and Student Portal Module**
    *   **Objective**: To provide read-only views of the timetable for faculty and students.
    *   **Description**: After logging in, a faculty member sees their personalized schedule. Students can use a public portal to view their class schedule without needing an account.

7.  **Audit Log Module**
    *   **Objective**: To track major changes made to the system.
    *   **Description**: Every time a timetable is generated or manually modified, a log entry is created to provide a history of actions.

---

## Chapter 6: UML DIAGRAMS

The Timetable MECS project uses several diagrams to illustrate the system's structure, components, and interactions. These diagrams serve the purpose of clarifying the system design.

### 6.1 Class Diagram

The Class Diagram shows the static structure of the Timetable MECS system by representing the main classes, their attributes, and the relationships between them. Key classes include `User`, `Faculty`, `Subject`, `Room`, `Section`, `TimetableEntry`, and the main `App` component that manages state.

### 6.2 Use Case Diagram

The Use Case Diagram represents the interactions between the **Admin**, **Faculty**, and **Student** with the Timetable MECS system. The Admin manages academic data, generates and edits timetables, and monitors audit logs. Faculty members can log in to view their personal timetables, while students can access the public timetable without authentication.

### 6.3 Activity Diagram

The activity diagram illustrates the workflow of the Timetable MECS system, from user login to timetable publication. It shows the flow of control from an Admin managing data, generating the timetable via the scheduling algorithm, and reviewing the output, which is then made available to Faculty and Students.

### 6.4 Sequence Diagram

The Sequence Diagram captures the dynamic behavior for the core functionality of timetable generation. It illustrates the chronological order of interactions between the **Admin**, the `App` component, and the `Scheduler` engine during the timetable creation process.

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
6.  Sarnaik, S., More, T., Shinde, S., & Shah, D. (2023). Timetable Generator Using Genetic Algorithm. *International Research Journal of Engineering and Technology (IRJET)*.
7. Rane, M. V., Apte, V. M., Nerkar, V. N., Edinburgh, M. R., & Rajput, K. Y. (2021). Automated Timetabling System for University Course. *2021 International Conference on Emerging Smart Computing and Informatics (ESCI)*.
