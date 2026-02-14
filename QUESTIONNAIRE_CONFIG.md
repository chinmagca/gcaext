# Questionnaire Configuration Guide

The GCA Assessment Tool questionnaire is now fully configurable. You can modify questions, scoring weights, and risk thresholds without changing component code.

## Configuration File

All questionnaire configuration is centralized in:
```
src/config/questionnaireConfig.ts
```

## How to Modify the Questionnaire

### 1. Adding/Removing/Editing Questions

Edit the `defaultQuestionnaireConfig.steps` array:

```typescript
{
    id: 'infrastructure',
    title: 'Your Digital Infrastructure',
    description: 'Tell us about your digital assets and infrastructure.',
    questions: [
        {
            id: 'usesEmail',  // Must match field in AssessmentResponses type
            title: 'Business Email',
            description: 'Do you use email for business communications?',
            icon: Server,  // Import from lucide-react
            category: 'infrastructure',  // infrastructure | data | operations | compliance
            weight: 10  // 0-100, contribution to category score
        },
        // Add more questions here...
    ]
}
```

**Important:** When adding new questions, you must also update the `AssessmentResponses` interface in `src/logic/scoring.ts`.

### 2. Adjusting Scoring Weights

Modify the `scoringWeights` section to change how much each category contributes to the final score:

```typescript
scoringWeights: {
    IT: {
        infrastructure: 0.30,  // 30%
        data: 0.25,            // 25%
        operations: 0.25,      // 25%
        compliance: 0.20       // 20%
    },
    NonIT: {
        infrastructure: 0.20,  // 20%
        data: 0.30,            // 30%
        operations: 0.30,      // 30%
        compliance: 0.20       // 20%
    }
}
```

**Note:** Weights should sum to 1.0 (100%) for each firm type.

### 3. Changing Risk Thresholds

Modify when scores transition between Low/Medium/High risk:

```typescript
riskThresholds: {
    low: 35,      // Scores 0-35 = Low Risk
    medium: 70,   // Scores 36-70 = Medium Risk
    high: 100     // Scores 71-100 = High Risk
}
```

### 4. Adding a New Step

To add an entirely new step:

1. Add a new step object to the `steps` array in `questionnaireConfig.ts`
2. Add corresponding fields to `AssessmentResponses` in `scoring.ts`
3. The UI will automatically render the new step!

Example:
```typescript
{
    id: 'security-measures',
    title: 'Current Security Measures',
    description: 'What security controls do you have in place?',
    questions: [
        {
            id: 'hasFirewall',
            title: 'Firewall Protection',
            description: 'Do you have a firewall protecting your network?',
            icon: Shield,
            category: 'infrastructure',
            weight: 15
        }
    ]
}
```

## Question Weight Guidelines

- **High Impact (20-40):** Critical security factors (e.g., handles financial data, regulatory compliance)
- **Medium Impact (10-20):** Important but not critical (e.g., cloud services, remote work)
- **Low Impact (5-10):** Supporting factors (e.g., email usage, data retention)
- **Negative Weights (-5 to -10):** Lack of something increases risk (e.g., no cyber insurance, no training)

## Category Guidelines

- **infrastructure:** Digital assets, systems, and external exposure
- **data:** Types and sensitivity of data handled
- **operations:** Business dependency on digital systems
- **compliance:** Regulatory requirements and risk management

## Testing Your Changes

After modifying the configuration:

1. Save the file
2. The dev server will hot-reload
3. Test the questionnaire flow to ensure all questions appear correctly
4. Verify scoring calculations are as expected

## Advanced: Custom Scoring Logic

For more complex scoring logic, modify `src/logic/scoringConfig.ts`. The `calculateScoreFromConfig` function dynamically calculates scores based on the configuration.
