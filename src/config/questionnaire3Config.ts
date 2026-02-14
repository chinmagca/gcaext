import type { LucideIcon } from 'lucide-react';
import { Server, Globe, Lock, Shield, AlertTriangle, Briefcase, CheckCircle, Wifi, Database, Users, DollarSign, Heart } from 'lucide-react';
import type { QuestionnaireConfig } from './questionnaireConfig';

// Questionnaire 3: Simplified, user-friendly language, 5 categories, 25 questions
export const questionnaire3Config: QuestionnaireConfig = {
    steps: [
        {
            id: 'digital-dependency-pulse',
            title: 'Digital Dependency',
            description: 'The "Pulse" Check',
            questions: [
                {
                    id: 'businessStopsWithoutTech',
                    title: '48-Hour Tech Shutdown',
                    description: 'If your computers or internet went down for 48 hours, would your business stop making money?',
                    icon: AlertTriangle,
                    category: 'operations',
                    weight: 25
                },
                {
                    id: 'usesCloudTools',
                    title: 'Cloud Tools Usage',
                    description: 'Do you use cloud tools like Google Workspace, Microsoft 365, or Tally on Cloud?',
                    icon: Globe,
                    category: 'infrastructure',
                    weight: 15
                },
                {
                    id: 'remoteWorkEnabled',
                    title: 'Remote Work',
                    description: 'Do employees work remotely or access company files from home/travel?',
                    icon: Wifi,
                    category: 'infrastructure',
                    weight: 15
                },
                {
                    id: 'personalDevicesUsed',
                    title: 'Personal Devices for Work',
                    description: 'Do staff use their personal phones or laptops for official business work?',
                    icon: Server,
                    category: 'infrastructure',
                    weight: 15
                },
                {
                    id: 'websiteAppDependency',
                    title: 'Website/App Dependency',
                    description: 'Does your business rely on a website or app to find or serve customers?',
                    icon: Globe,
                    category: 'operations',
                    weight: 20
                }
            ]
        },
        {
            id: 'value-sensitivity-target',
            title: 'Value & Sensitivity',
            description: 'The "Target" Check',
            questions: [
                {
                    id: 'storesCustomerInfo',
                    title: 'Customer Information',
                    description: 'Do you store customer IDs, phone numbers, or home addresses digitally?',
                    icon: Database,
                    category: 'data',
                    weight: 20
                },
                {
                    id: 'holdsTradeSecrets',
                    title: 'Trade Secrets & IP',
                    description: 'Do you hold "Trade Secrets," proprietary designs, or confidential client contracts?',
                    icon: Shield,
                    category: 'data',
                    weight: 25
                },
                {
                    id: 'leakCausesLegalTrouble',
                    title: 'Legal Consequences',
                    description: 'Would a public data leak cause you legal trouble or a loss of your business license?',
                    icon: AlertTriangle,
                    category: 'compliance',
                    weight: 30
                },
                {
                    id: 'clientsAskAboutSecurity',
                    title: 'Client Security Inquiries',
                    description: 'Do clients ever ask about your data security practices before they agree to work with you?',
                    icon: Users,
                    category: 'data',
                    weight: 15
                },
                {
                    id: 'reputationBuiltOnTrust',
                    title: 'Trust-Based Reputation',
                    description: 'Is your brand\'s reputation built heavily on client trust and confidentiality?',
                    icon: Heart,
                    category: 'data',
                    weight: 20
                }
            ]
        },
        {
            id: 'financial-risk-wallet',
            title: 'Financial Risk',
            description: 'The "Wallet" Check',
            questions: [
                {
                    id: 'acceptsDigitalPayments',
                    title: 'Digital Payment Acceptance',
                    description: 'Does your business accept digital payments (UPI, Cards, Net Banking)?',
                    icon: DollarSign,
                    category: 'operations',
                    weight: 20
                },
                {
                    id: 'storesVendorBankDetails',
                    title: 'Bank Details Storage',
                    description: 'Do you store the bank details of your vendors, suppliers, or employees?',
                    icon: Lock,
                    category: 'data',
                    weight: 25
                },
                {
                    id: 'digitalBillingPayroll',
                    title: 'Digital Financial Systems',
                    description: 'Is your billing, invoicing, or payroll managed entirely through digital software?',
                    icon: Server,
                    category: 'operations',
                    weight: 20
                },
                {
                    id: 'dependsOnSaasVendors',
                    title: 'Third-Party SaaS Dependency',
                    description: 'Do you depend on third-party digital vendors (SaaS) to run your daily operations?',
                    icon: Globe,
                    category: 'infrastructure',
                    weight: 15
                },
                {
                    id: 'emailHackRiskPaymentDiversion',
                    title: 'Payment Diversion Risk',
                    description: 'If your email was hacked, could a fraudster successfully divert a payment from a client?',
                    icon: AlertTriangle,
                    category: 'data',
                    weight: 30
                }
            ]
        },
        {
            id: 'human-awareness-culture',
            title: 'Human Awareness',
            description: 'The "Culture" Check',
            questions: [
                {
                    id: 'phishingTrainingGiven',
                    title: 'Phishing Training',
                    description: 'Have your employees been taught how to spot a fake "phishing" email or text?',
                    icon: Shield,
                    category: 'compliance',
                    weight: -15 // Negative: lack of training increases risk
                },
                {
                    id: 'strictPasswordPolicy',
                    title: 'Password Sharing Policy',
                    description: 'Do you have a strict policy against sharing passwords among team members?',
                    icon: Lock,
                    category: 'compliance',
                    weight: -10
                },
                {
                    id: 'accessRevokedImmediately',
                    title: 'Exit Access Revocation',
                    description: 'Do you immediately revoke all digital access when an employee leaves the company?',
                    icon: Users,
                    category: 'compliance',
                    weight: -15
                },
                {
                    id: 'seenSuspiciousActivity',
                    title: 'Security Incidents Awareness',
                    description: 'Have you ever seen suspicious login attempts or "weird" emails in your inbox?',
                    icon: AlertTriangle,
                    category: 'compliance',
                    weight: 10 // Positive: awareness of threats
                },
                {
                    id: 'hasTechSupportPerson',
                    title: 'Tech Support Contact',
                    description: 'Is there a specific person (internal or external) you call when "the tech breaks"?',
                    icon: Briefcase,
                    category: 'compliance',
                    weight: -10
                }
            ]
        },
        {
            id: 'safety-net-recovery',
            title: 'Safety Net',
            description: 'The "Recovery" Check',
            questions: [
                {
                    id: 'hasSecureBackup',
                    title: 'Secure Data Backup',
                    description: 'Do you have a backup of your data stored in a separate, secure location?',
                    icon: Database,
                    category: 'operations',
                    weight: -20 // Negative: lack of backup increases risk
                },
                {
                    id: 'usesMfaForBanking',
                    title: 'Multi-Factor Authentication',
                    description: 'Do you use Multi-Factor Authentication (OTP/Mobile App Approval) for your banking and main emails?',
                    icon: Lock,
                    category: 'infrastructure',
                    weight: -20
                },
                {
                    id: 'hasPaidAntivirus',
                    title: 'Professional Antivirus',
                    description: 'Are all company laptops/PCs protected by a professional (paid) antivirus?',
                    icon: Shield,
                    category: 'infrastructure',
                    weight: -15
                },
                {
                    id: 'hasWrittenIncidentPlan',
                    title: 'Incident Response Plan',
                    description: 'Do you have a "Step 1, Step 2" plan written down for what to do if you are hacked?',
                    icon: CheckCircle,
                    category: 'compliance',
                    weight: -15
                },
                {
                    id: 'leadershipDiscussesRisks',
                    title: 'Leadership Risk Discussion',
                    description: 'Does your leadership team discuss digital risks at least once a year?',
                    icon: Briefcase,
                    category: 'compliance',
                    weight: -10
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
