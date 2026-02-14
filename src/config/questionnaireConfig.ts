import type { LucideIcon } from 'lucide-react';
import { Server, Globe, Lock, Shield, AlertTriangle, Briefcase, CheckCircle } from 'lucide-react';

export type QuestionField = keyof Omit<import('../logic/scoring').AssessmentResponses, 'firmType'>;

export interface Question {
    id: QuestionField;
    title: string;
    description: string;
    icon: LucideIcon;
    category: 'infrastructure' | 'data' | 'operations' | 'compliance';
    weight: number; // 0-100, contribution to category score
}

export interface StepConfig {
    id: string;
    title: string;
    description: string;
    questions: Question[];
}

export interface ScoringWeights {
    IT: {
        infrastructure: number;
        data: number;
        operations: number;
        compliance: number;
    };
    NonIT: {
        infrastructure: number;
        data: number;
        operations: number;
        compliance: number;
    };
}

export interface QuestionnaireConfig {
    steps: StepConfig[];
    scoringWeights: ScoringWeights;
    riskThresholds: {
        low: number;
        medium: number;
        high: number;
    };
}

// Default questionnaire configuration
export const defaultQuestionnaireConfig: QuestionnaireConfig = {
    steps: [
        {
            id: 'infrastructure',
            title: 'Your Digital Infrastructure',
            description: 'Tell us about your digital assets and infrastructure.',
            questions: [
                {
                    id: 'usesEmail',
                    title: 'Business Email',
                    description: 'Do you use email for business communications?',
                    icon: Server,
                    category: 'infrastructure',
                    weight: 10
                },
                {
                    id: 'hasWebsiteOrApp',
                    title: 'Website or Mobile App',
                    description: 'Do you have a public-facing website or mobile app?',
                    icon: Globe,
                    category: 'infrastructure',
                    weight: 20
                },
                {
                    id: 'usesCloudServices',
                    title: 'Cloud Services',
                    description: 'Do you use cloud services (AWS, Azure, Google Cloud, SaaS apps)?',
                    icon: Server,
                    category: 'infrastructure',
                    weight: 20
                },
                {
                    id: 'hasOnPremiseServers',
                    title: 'On-Premise Servers',
                    description: 'Do you operate your own physical servers?',
                    icon: Server,
                    category: 'infrastructure',
                    weight: 15
                },
                {
                    id: 'hasPublicFacingSystems',
                    title: 'Public-Facing Systems',
                    description: 'Do you have servers or services accessible from the internet?',
                    icon: Globe,
                    category: 'infrastructure',
                    weight: 25
                },
                {
                    id: 'hasThirdPartyIntegrations',
                    title: 'Third-Party Integrations',
                    description: 'Do you integrate with external APIs or services?',
                    icon: Server,
                    category: 'infrastructure',
                    weight: 10
                }
            ]
        },
        {
            id: 'data-handling',
            title: 'Data You Handle',
            description: 'What type of data does your organization handle?',
            questions: [
                {
                    id: 'collectsCustomerData',
                    title: 'Customer Personal Data',
                    description: 'Do you collect/store customer names, contact info, or addresses?',
                    icon: Lock,
                    category: 'data',
                    weight: 15
                },
                {
                    id: 'handlesFinancialData',
                    title: 'Financial Data',
                    description: 'Do you handle payment information, bank details, or financial records?',
                    icon: Lock,
                    category: 'data',
                    weight: 30
                },
                {
                    id: 'storesEmployeeData',
                    title: 'Employee Data',
                    description: 'Do you maintain employee records, payroll, or HR data?',
                    icon: Lock,
                    category: 'data',
                    weight: 10
                },
                {
                    id: 'hasProprietaryData',
                    title: 'Proprietary/IP Data',
                    description: 'Do you have trade secrets, source code, or proprietary designs?',
                    icon: Shield,
                    category: 'data',
                    weight: 20
                },
                {
                    id: 'handlesHealthData',
                    title: 'Health/Medical Data',
                    description: 'Do you handle patient records or health information?',
                    icon: Lock,
                    category: 'data',
                    weight: 20
                },
                {
                    id: 'retainsDataLongTerm',
                    title: 'Long-Term Data Retention',
                    description: 'Do you store data for more than 1 year?',
                    icon: Server,
                    category: 'data',
                    weight: 5
                }
            ]
        },
        {
            id: 'operations',
            title: 'Business Operations',
            description: 'How dependent is your business on digital systems?',
            questions: [
                {
                    id: 'acceptsDigitalPayments',
                    title: 'Digital Payments',
                    description: 'Do you accept digital payments (UPI, cards, online banking)?',
                    icon: Lock,
                    category: 'operations',
                    weight: 20
                },
                {
                    id: 'hasRemoteWork',
                    title: 'Remote Work',
                    description: 'Do employees access systems remotely or work from home?',
                    icon: Server,
                    category: 'operations',
                    weight: 15
                },
                {
                    id: 'criticalUptime',
                    title: 'Critical Uptime',
                    description: 'Would 4+ hours of system downtime significantly impact operations?',
                    icon: AlertTriangle,
                    category: 'operations',
                    weight: 25
                },
                {
                    id: 'revenueDependent',
                    title: 'Revenue Dependency',
                    description: 'Is more than 50% of your revenue dependent on digital systems?',
                    icon: Briefcase,
                    category: 'operations',
                    weight: 25
                },
                {
                    id: 'hasCustomerFacingSystems',
                    title: 'Customer-Facing Systems',
                    description: 'Do customers directly interact with your digital systems?',
                    icon: Globe,
                    category: 'operations',
                    weight: 10
                },
                {
                    id: 'hasSupplyChainIntegration',
                    title: 'Supply Chain Integration',
                    description: 'Are your systems integrated with suppliers or partners?',
                    icon: Server,
                    category: 'operations',
                    weight: 5
                }
            ]
        },
        {
            id: 'compliance',
            title: 'Compliance & Risk Factors',
            description: 'Regulatory requirements and security awareness.',
            questions: [
                {
                    id: 'hasRegulatoryCompliance',
                    title: 'Regulatory Compliance',
                    description: 'Are you required to comply with ISO, RBI, GDPR, HIPAA, or similar standards?',
                    icon: Shield,
                    category: 'compliance',
                    weight: 40
                },
                {
                    id: 'hasIndustryRegulations',
                    title: 'Industry Regulations',
                    description: 'Does your industry have specific cybersecurity requirements?',
                    icon: Shield,
                    category: 'compliance',
                    weight: 30
                },
                {
                    id: 'hadPreviousIncidents',
                    title: 'Previous Security Incidents',
                    description: 'Have you experienced security incidents or data breaches?',
                    icon: AlertTriangle,
                    category: 'compliance',
                    weight: 20
                },
                {
                    id: 'hasCyberInsurance',
                    title: 'Cyber Insurance',
                    description: 'Do you have cybersecurity insurance coverage?',
                    icon: Shield,
                    category: 'compliance',
                    weight: -5 // Negative weight = lack of insurance increases risk
                },
                {
                    id: 'providesSecurityTraining',
                    title: 'Security Training',
                    description: 'Do you provide regular cybersecurity training to employees?',
                    icon: CheckCircle,
                    category: 'compliance',
                    weight: -5 // Negative weight = lack of training increases risk
                }
            ]
        }
    ],
    scoringWeights: {
        IT: {
            infrastructure: 0.30,
            data: 0.25,
            operations: 0.25,
            compliance: 0.20
        },
        NonIT: {
            infrastructure: 0.20,
            data: 0.30,
            operations: 0.30,
            compliance: 0.20
        }
    },
    riskThresholds: {
        low: 35,
        medium: 70,
        high: 100
    }
};
