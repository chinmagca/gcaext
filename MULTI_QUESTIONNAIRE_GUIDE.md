# Multi-Questionnaire System - Quick Start Guide

## How to Switch Between Questionnaires

The assessment tool now supports **3 different questionnaire variants**. Switching between them is as simple as changing one line of code!

### Step 1: Open the Selector File

Open: `src/config/questionnaireSelector.ts`

### Step 2: Change the Active Questionnaire

Find this line (around line 17):

```typescript
export const ACTIVE_QUESTIONNAIRE: QuestionnaireVariant = 'default';
```

Change it to one of these options:

```typescript
// Option 1: Original questionnaire (23 questions)
export const ACTIVE_QUESTIONNAIRE: QuestionnaireVariant = 'default';

// Option 2: Detailed assessment (25 questions)
export const ACTIVE_QUESTIONNAIRE: QuestionnaireVariant = 'questionnaire2';

// Option 3: User-friendly "check" format (25 questions)
export const ACTIVE_QUESTIONNAIRE: QuestionnaireVariant = 'questionnaire3';
```

### Step 3: Save and Reload

Save the file and the dev server will hot-reload automatically!

---

## Questionnaire Comparison

### Default (Original)
- **Steps:** 5
- **Questions:** 23
- **Style:** Technical, comprehensive
- **Categories:**
  - Infrastructure & Digital Assets
  - Data Handling & Sensitivity
  - Operations & Dependencies
  - Compliance & Risk Exposure

**Best for:** IT-savvy audiences, detailed technical assessment

---

### Questionnaire 2 (Detailed)
- **Steps:** 5
- **Questions:** 25
- **Style:** Detailed, security-focused
- **Categories:**
  - Digital Dependency (If tech stops, does revenue stop?)
  - Data Value & Sensitivity (Are you holding something attackers would want?)
  - Exposure Surface (How many entry points exist?)
  - Awareness & Governance (Is cyber risk managed or ignored?)
  - Preparedness & Recovery (If attacked, can you survive it?)

**Best for:** Security-conscious businesses, detailed risk assessment

---

### Questionnaire 3 (User-Friendly)
- **Steps:** 5
- **Questions:** 25
- **Style:** Simple, practical language
- **Categories:**
  - Digital Dependency - "Pulse" Check
  - Value & Sensitivity - "Target" Check
  - Financial Risk - "Wallet" Check
  - Human Awareness - "Culture" Check
  - Safety Net - "Recovery" Check

**Best for:** Non-technical MSMEs, lead generation, maximum accessibility

---

## Adding Your Own Questionnaire

Want to create a custom questionnaire? Here's how:

### 1. Create a New Config File

Create `src/config/questionnaireXConfig.ts`:

```typescript
import type { LucideIcon } from 'lucide-react';
import { /* import icons */ } from 'lucide-react';
import type { QuestionnaireConfig } from './questionnaireConfig';

export const questionnaireXConfig: QuestionnaireConfig = {
    steps: [
        {
            id: 'your-step-id',
            title: 'Your Step Title',
            description: 'Your step description',
            questions: [
                {
                    id: 'yourQuestionId',
                    title: 'Question Title',
                    description: 'Question description',
                    icon: YourIcon,
                    category: 'infrastructure', // or 'data', 'operations', 'compliance'
                    weight: 20
                }
            ]
        }
    ],
    scoringWeights: {
        IT: { infrastructure: 0.30, data: 0.25, operations: 0.25, compliance: 0.20 },
        NonIT: { infrastructure: 0.20, data: 0.30, operations: 0.30, compliance: 0.20 }
    },
    riskThresholds: { low: 35, medium: 70, high: 100 }
};
```

### 2. Update the Selector

In `src/config/questionnaireSelector.ts`:

```typescript
import { questionnaireXConfig } from './questionnaireXConfig';

export type QuestionnaireVariant = 'default' | 'questionnaire2' | 'questionnaire3' | 'questionnaireX';

export const ACTIVE_QUESTIONNAIRE: QuestionnaireVariant = 'questionnaireX';

export function getActiveQuestionnaireConfig(): QuestionnaireConfig {
    switch (ACTIVE_QUESTIONNAIRE) {
        case 'questionnaireX':
            return questionnaireXConfig;
        // ... other cases
    }
}
```

### 3. Update Types (if needed)

If your questions use new field IDs, add them to `src/logic/scoring.ts`:

```typescript
export interface AssessmentResponses {
    firmType: 'IT' | 'Non-IT';
    // ... existing fields
    yourQuestionId: boolean;
}
```

---

## Testing Different Questionnaires

1. Switch to questionnaire2: `ACTIVE_QUESTIONNAIRE = 'questionnaire2'`
2. Complete the assessment
3. Note the questions and scoring
4. Switch to questionnaire3: `ACTIVE_QUESTIONNAIRE = 'questionnaire3'`
5. Complete again and compare

---

## Recommendations

- **For lead generation:** Use `questionnaire3` (most accessible)
- **For technical clients:** Use `default` (comprehensive)
- **For security audits:** Use `questionnaire2` (detailed)
- **For A/B testing:** Switch between variants and track completion rates

---

## Need Help?

See `QUESTIONNAIRE_CONFIG.md` for details on configuring individual questions, weights, and scoring.
