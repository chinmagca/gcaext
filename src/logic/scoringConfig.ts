import type { AssessmentResponses, AssessmentResult } from './scoring';
import { defaultQuestionnaireConfig, type QuestionnaireConfig } from '../config/questionnaireConfig';

export function calculateScoreFromConfig(
    data: AssessmentResponses,
    config: QuestionnaireConfig = defaultQuestionnaireConfig
): AssessmentResult {
    const isIT = data.firmType === 'IT';
    const weights = isIT ? config.scoringWeights.IT : config.scoringWeights.NonIT;

    // Calculate category scores dynamically from configuration
    const categoryScores: Record<string, number> = {
        infrastructure: 0,
        data: 0,
        operations: 0,
        compliance: 0
    };

    // Iterate through all steps and questions in config
    config.steps.forEach(step => {
        step.questions.forEach(question => {
            const fieldValue = data[question.id];
            const category = question.category;

            // For negative weights (insurance, training), add weight if answer is false
            if (question.weight < 0) {
                if (!fieldValue) {
                    categoryScores[category] += Math.abs(question.weight);
                }
            } else {
                // For positive weights, add weight if answer is true
                if (fieldValue) {
                    categoryScores[category] += question.weight;
                }
            }
        });
    });

    // Calculate weighted final score
    let finalScore = 0;
    finalScore += categoryScores.infrastructure * weights.infrastructure;
    finalScore += categoryScores.data * weights.data;
    finalScore += categoryScores.operations * weights.operations;
    finalScore += categoryScores.compliance * weights.compliance;

    finalScore = Math.min(100, Math.round(finalScore));

    // Determine Risk Level
    let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
    if (finalScore > config.riskThresholds.medium) {
        riskLevel = 'High';
    } else if (finalScore > config.riskThresholds.low) {
        riskLevel = 'Medium';
    }

    // Generate Recommendations
    const recommendations = [];

    if (riskLevel === 'High') {
        recommendations.push({
            service: 'VAPT (Vulnerability Assessment)',
            description: 'Comprehensive testing of your exposed assets.',
            priority: 'Critical' as const
        });
        recommendations.push({
            service: '24/7 SOC Monitoring',
            description: 'Real-time threat detection and response.',
            priority: 'Recommended' as const
        });
    } else if (riskLevel === 'Medium') {
        recommendations.push({
            service: 'Security Posture Assessment',
            description: 'Identify vulnerabilities and security gaps.',
            priority: 'Critical' as const
        });
        recommendations.push({
            service: 'Endpoint Protection',
            description: 'Antivirus and firewall for all devices.',
            priority: 'Recommended' as const
        });
    } else {
        recommendations.push({
            service: 'Employee Security Training',
            description: 'Phishing awareness and safe practices.',
            priority: 'Recommended' as const
        });
    }

    // Specific triggers
    if (data.hasRegulatoryCompliance || data.hasIndustryRegulations) {
        recommendations.push({
            service: 'Compliance Audit',
            description: 'Ensure adherence to required standards (ISO, GDPR, HIPAA, etc.).',
            priority: 'Critical' as const
        });
    }

    if (data.handlesFinancialData || data.handlesHealthData) {
        recommendations.push({
            service: 'Data Protection Impact Assessment',
            description: 'Evaluate risks to sensitive data.',
            priority: 'Recommended' as const
        });
    }

    if (data.hadPreviousIncidents) {
        recommendations.push({
            service: 'Incident Response Planning',
            description: 'Prepare for and prevent future security incidents.',
            priority: 'Critical' as const
        });
    }

    if (!data.hasCyberInsurance && riskLevel !== 'Low') {
        recommendations.push({
            service: 'Cyber Insurance Consultation',
            description: 'Protect your business from financial losses.',
            priority: 'Optional' as const
        });
    }

    return {
        score: finalScore,
        riskLevel,
        recommendations,
        breakdown: {
            exposure: categoryScores.infrastructure,
            dataSensitivity: categoryScores.data,
            regulatory: categoryScores.compliance,
            operational: categoryScores.operations
        }
    };
}
