# ImpactHire

> **Turning diversity goals into real hiring impact.**

ImpactHire is a **B2B inclusive hiring platform** that helps
organizations transform their diversity and ESG commitments into
measurable hiring outcomes. The platform enables companies to publish
inclusive job opportunities, intelligently match existing candidates,
and monitor diversity indicators through a centralized dashboard.

Unlike traditional recruitment platforms, ImpactHire focuses on
**supporting recruiters and HR teams** by providing intelligent
matching, ESG-oriented insights, and diversity management tools rather
than candidate registration.

------------------------------------------------------------------------

# Problem Statement

Organizations pursuing Environmental, Social and Governance (ESG) goals
often struggle to identify and recruit qualified professionals from
underrepresented groups while reducing unconscious bias during
recruitment.

ImpactHire addresses this challenge by providing:

-   Intelligent candidate matching.
-   Diversity-oriented recruitment workflows.
-   ESG metrics and reporting.
-   Company and recruiter management.
-   Inclusive vacancy management.

------------------------------------------------------------------------

# Key Features

  -----------------------------------------------------------------------
  Feature                       Description
  ----------------------------- -----------------------------------------
  Authentication                Secure JWT authentication with role-based
                                access.

  Company Management            Configure company information and
                                diversity objectives.

  Recruiter Management          Administrators can create and manage
                                recruiter accounts.

  Vacancy Management            Publish and maintain inclusive job
                                opportunities.

  Intelligent Matching          Rank candidates using configurable
                                matching weights.

  Skills Management             Associate technical skills with
                                vacancies.

  ESG Dashboard                 Visualize diversity indicators and hiring
                                metrics.

  Diversity Groups              Manage company diversity initiatives.

  Reports                       Generate ESG-oriented reports for
                                decision making.
  -----------------------------------------------------------------------

> **Note:** Candidate profiles are preloaded into the platform for the
> MVP. Candidate registration and profile management are outside the
> scope of this project.

------------------------------------------------------------------------

# System Architecture

``` mermaid
flowchart LR

A[Administrator / Recruiter]
--> B[React Frontend]

B --> C[NestJS REST API]

C --> D[Authentication]

C --> E[Vacancies]

C --> F[Intelligent Matching]

C --> G[ESG Dashboard]

E --> H[(PostgreSQL)]

F --> H

G --> H

H --> I[Prisma ORM]
```

------------------------------------------------------------------------

# User Roles

## Administrator

Administrators have full access to the platform, including:

-   ESG Dashboard
-   Vacancy Management
-   ESG Indicators
-   Company Management
-   User Management
-   ESG Reports

## Recruiter

Recruiters have access to:

-   ESG Dashboard
-   Vacancy Management
-   ESG Indicators

------------------------------------------------------------------------

# Technology Stack

## Frontend

-   React
-   TypeScript
-   Vite
-   Tailwind CSS
-   React Router

## Backend

-   NestJS
-   Node.js
-   TypeScript
-   Prisma ORM
-   PostgreSQL

## Authentication & Security

-   JWT Authentication
-   Passport
-   bcrypt

## Documentation & Development

-   Swagger / OpenAPI
-   DTO Validation

------------------------------------------------------------------------

# Getting Started

## Prerequisites

Before running the project locally, make sure you have installed:

-   Node.js (LTS recommended)
-   npm
-   PostgreSQL
-   Git

------------------------------------------------------------------------

## Installation

Clone the repository:

``` bash
git clone https://github.com/No-Country-simulation/S06-26-NC-Equipo-75-Web-App-Development.git
cd S06-26-NC-Equipo-75-Web-App-Development
```

Install dependencies for both frontend and backend:

``` bash
npm install
```

Configure the required environment variables and start the development
servers.

------------------------------------------------------------------------

# Environment Variables

Both the frontend and backend require environment variables to connect
to external services and the database.

Typical backend configuration includes:

``` env
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=
PORT=
```

> Never commit secrets or production credentials to the repository.

------------------------------------------------------------------------

# Project Structure

``` text
frontend/
backend/
├── auth/
├── empresas/
├── vacantes/
├── reclutadores/
├── skills/
├── grupos-diversidad/
├── region/
├── prisma/
└── ...
```

The backend follows a modular architecture built with NestJS, where each
business domain is encapsulated in its own module.

------------------------------------------------------------------------

# API Documentation

Interactive API documentation is available through Swagger.

Backend Swagger:

https://impacthire-web-app-development.onrender.com/docs

Swagger provides endpoint documentation, request/response schemas and
allows API testing directly from the browser.

------------------------------------------------------------------------

# Deployment

  Service    Platform
  ---------- ----------
  Frontend   Vercel
  Backend    Render

Frontend:

https://impacthire.vercel.app/login

Backend API:

https://impacthire-web-app-development.onrender.com/

------------------------------------------------------------------------

# Demo Credentials

For demonstration purposes you can use the following administrator
account.

  Email            Password
  ---------------- ----------
  admin@test.com   123456

------------------------------------------------------------------------

# Typical Workflow

1.  Administrator logs into the platform.
2.  Company profile and diversity objectives are configured.
3.  Recruiters publish new vacancies.
4.  Skills and matching weights are assigned.
5.  The matching engine ranks available candidates.
6.  Recruiters review the generated shortlist.
7.  ESG dashboards and indicators provide measurable hiring insights.

------------------------------------------------------------------------

# Future Improvements

The project was designed with future scalability in mind. Potential
enhancements include:

-   Interactive talent heatmap.
-   Candidate self-registration.
-   AI-powered bias explanation.
-   PDF ESG reports.
-   Real-time notifications.
-   Integration with external recruitment platforms.

------------------------------------------------------------------------

# Development Team

ImpactHire was developed during the **No Country Simulation** by a
multidisciplinary team committed to building technology that promotes
inclusive hiring and measurable ESG impact.

  -------------------------------------------------------------------------------------------------------------------------
  Name              GitHub                             LinkedIn
  ----------------- ---------------------------------- --------------------------------------------------------------------
  Augusto Zanetta   https://github.com/AugustoZan      https://www.linkedin.com/in/augusto-zanetta-8745012b8

  Facundo Seva      https://github.com/facuseva        https://www.linkedin.com/in/facundo-seva-98b61a1a1/

  Samuel Granadillo ---                                ---

  Adriel Fariña     https://github.com/adriel9-5       https://www.linkedin.com/in/adriel-ivo

  Anthony Bañon     https://github.com/anthonybanion   https://www.linkedin.com/in/anthonybanion
  Arias                                                

  Tomas Darielli    https://github.com/tomidarielli    https://www.linkedin.com/in/tomasdarielli

  Nahuel Charlone   https://github.com/nmcharlone      https://www.linkedin.com/in/nahuel-maximiliano-charlone-6838ba268/
                                               
  -------------------------------------------------------------------------------------------------------------------------

> If any team member would like to add or update their GitHub or
> LinkedIn profile, this section can be easily updated.

------------------------------------------------------------------------

# Acknowledgements

Special thanks to **No Country** for providing the collaborative
simulation environment and the opportunity to design and build a
real-world software solution in a multidisciplinary team.

The project was inspired by the challenge of helping organizations
achieve their diversity and ESG objectives through technology.

------------------------------------------------------------------------

# License

This project was developed for educational purposes as part of the **No
Country Simulation**.

Feel free to explore the code, learn from the implementation, and adapt
ideas for educational or personal projects.

------------------------------------------------------------------------

# Final Notes

ImpactHire demonstrates how modern web technologies can be combined to
build a scalable platform focused on inclusive hiring.

The project integrates:

-   Secure authentication and authorization.
-   Modular REST API architecture.
-   Relational database management with Prisma and PostgreSQL.
-   Intelligent candidate matching.
-   ESG-oriented dashboards and indicators.
-   Responsive user interface.
-   API documentation with Swagger.

While this MVP focuses on the employer experience, its architecture
allows future expansion with candidate self-service, AI-assisted
recommendations, advanced analytics, and geospatial visualizations.

------------------------------------------------------------------------

```{=html}
<p align="center">
```
**ImpactHire**

*Turning diversity goals into real hiring impact.*

```{=html}
</p>
```
