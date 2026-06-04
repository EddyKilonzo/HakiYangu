# HakiYangu 🇰🇪

HakiYangu (Swahili for "My Rights") is an AI-powered legal rights assistant designed to make Kenyan law accessible, understandable, and actionable for every citizen.

## 🌟 Overview

Navigating the legal landscape in Kenya can be daunting. HakiYangu bridges the gap by providing:
- **Bilingual Support:** Interaction in both English and Swahili (Sheng-friendly).
- **AI Legal Guidance:** Instant, plain-language explanations of rights under Kenyan Acts.
- **Demand Letter Generation:** Automated creation of formal demand letters and complaints.
- **Pre-defined Scenarios:** Quick access to common legal issues (Landlord/Tenant, Employment, etc.).

---

## 🏗️ Architecture

The project is split into two main parts:
1.  **Frontend:** Next.js application with a focus on immersive, interactive UI.
2.  **Backend:** NestJS API providing logic for AI chat, letter generation, and scenario management.

### System Interaction Flow

```mermaid
graph TD
    A[User visits HakiYangu] --> B{Choose Interaction}
    B --> C[Browse Scenarios]
    B --> D[Direct Chat]
    C --> E[Select Scenario]
    E --> F[Auto-populate Chat]
    D --> G[Type Question]
    F --> H[HakiYangu AI Response]
    G --> H
    H --> I{Suggest Letter?}
    I -- Yes --> J[Generate Demand Letter]
    I -- No --> K[Continue Conversation]
    J --> L[View/Download Letter]
```

### Technical Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant AnthropicAPI

    User->>Frontend: Input Message
    Frontend->>Backend: POST /chat (Message, SessionID)
    Backend->>AnthropicAPI: Create Message (System Prompt + History)
    AnthropicAPI-->>Backend: Legal Advice + Metadata (Area, SuggestLetter)
    Backend-->>Frontend: Reply, Area, SuggestLetter
    Frontend-->>User: Display Response

    Note over User, AnthropicAPI: Demand Letter Generation
    User->>Frontend: Click "Generate Letter"
    Frontend->>Backend: POST /letter (Situation, Type, Language)
    Backend->>AnthropicAPI: Create Message (Letter Template Prompt)
    AnthropicAPI-->>Backend: Formatted Letter Text
    Backend-->>Frontend: Letter Content + Subject
    Frontend-->>User: Display Modal with Letter
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + Vanilla CSS (for custom animations)
- **UI Components:** Radix UI / Shadcn UI
- **Animations:** Framer Motion, AOS (Animate On Scroll)
- **Icons:** Lucide React

### Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **AI Engine:** Anthropic Claude 3.5 Sonnet
- **Configuration:** Nest ConfigService

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Anthropic API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/hakiyangu.git
    cd hakiyangu
    ```

2.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    cp .env.example .env # Add your ANTHROPIC_API_KEY
    npm run start:dev
    ```

3.  **Setup Frontend:**
    ```bash
    cd ../frontend
    npm install
    npm run dev
    ```

---

## ⚖️ Disclaimer

HakiYangu is an informational tool and **does not provide legal advice**. It is designed to help users understand their rights and prepare for legal actions. Always consult with a registered advocate for complex legal matters.

---

## 👥 The Team

- **Martha Ngendo** - Product Lead
- **Eddy Max Kilonzo** - Software Engineer
- **John Brandews** - Full-Stack Developer
- **Felix Tony Maloba** - UI/UX Designer

---

Built with ❤️ for Kenya 🇰🇪
