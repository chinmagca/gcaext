import type { LucideIcon } from 'lucide-react';
import { Server, Globe, Lock, Shield, AlertTriangle, Briefcase, CheckCircle, Wifi, Database, Users } from 'lucide-react';
import type { QuestionnaireConfig } from './questionnaireConfig';

// Questionnaire 2: More detailed, 5 categories, 25 questions
export const questionnaire2Config: QuestionnaireConfig = {
    steps: [
        {
            id: 'digital-dependency',
            title: 'Digital Dependency',
            description: 'If tech stops, does revenue stop?',
            questions: [
                {
                    id: 'reliesOnDigitalChannels',
                    title: 'Digital Business Channels',
                    description: 'Do you rely on email, messaging apps, website, or digital ads to generate business?',
                    icon: Globe,
                    category: 'operations',
                    weight: 20
                },
                {
                    id: 'revenueImpactFromDowntime',
                    title: '48-Hour Downtime Impact',
                    description: 'If internet and systems stopped for 48 hours, would revenue be significantly affected?',
                    icon: AlertTriangle,
                    category: 'operations',
                    weight: 25
                },
                {
                    id: 'digitalBusinessProcesses',
                    title: 'Digital Business Processes',
                    description: 'Are billing, inventory, payroll, or compliance handled digitally?',
                    icon: Server,
                    category: 'operations',
                    weight: 20
                },
                {
                    id: 'remoteSystemAccess',
                    title: 'Remote Access',
                    description: 'Do employees access systems remotely?',
                    icon: Wifi,
                    category: 'infrastructure',
                    weight: 15
                },
                {
                    id: 'digitalPaymentAcceptance',
                    title: 'Digital Payments',
                    description: 'Do you accept digital payments (UPI, cards, online transfers)?',
                    icon: Lock,
                    category: 'operations',
                    weight: 20
                }
            ]
        },
        {
            id: 'data-value-sensitivity',
            title: 'Data Value & Sensitivity',
            description: 'Are you holding something attackers would want?',
            questions: [
                {
                    id: 'storesCustomerData',
                    title: 'Customer Personal Data',
                    description: 'Do you store personal customer data?',
                    icon: Database,
                    category: 'data',
                    weight: 20
                },
                {
                    id: 'storesBankDetails',
                    title: 'Financial Records',
                    description: 'Do you store bank details or financial records?',
                    icon: Lock,
                    category: 'data',
                    weight: 30
                },
                {
                    id: 'handlesConfidentialInfo',
                    title: 'Confidential Information',
                    description: 'Do you handle confidential contracts, trade secrets, designs, or proprietary information?',
                    icon: Shield,
                    category: 'data',
                    weight: 25
                },
                {
                    id: 'breachWouldDamageTrust',
                    title: 'Brand Trust Risk',
                    description: 'Would a data breach damage client trust or your brand?',
                    icon: AlertTriangle,
                    category: 'data',
                    weight: 15
                },
                {
                    id: 'leakHasLegalConsequences',
                    title: 'Legal/Regulatory Exposure',
                    description: 'Could a data leak expose you to legal or regulatory penalties?',
                    icon: Shield,
                    category: 'compliance',
                    weight: 30
                }
            ]
        },
        {
            id: 'exposure-surface',
            title: 'Exposure Surface',
            description: 'How many entry points exist?',
            questions: [
                {
                    id: 'personalDevicesForWork',
                    title: 'Personal Device Usage',
                    description: 'Do employees use personal devices for work?',
                    icon: Server,
                    category: 'infrastructure',
                    weight: 15
                },
                {
                    id: 'multipleCloudTools',
                    title: 'Multiple Cloud/SaaS Tools',
                    description: 'Do you use multiple cloud/SaaS tools (5 or more)?',
                    icon: Globe,
                    category: 'infrastructure',
                    weight: 15
                },
                {
                    id: 'iotDevicesConnected',
                    title: 'Smart Devices Connected',
                    description: 'Are smart devices (CCTV, biometric attendance, IoT devices) connected to office internet?',
                    icon: Wifi,
                    category: 'infrastructure',
                    weight: 10
                },
                {
                    id: 'frequentExternalSharing',
                    title: 'External File Sharing',
                    description: 'Do you frequently share sensitive files with vendors or freelancers?',
                    icon: Users,
                    category: 'infrastructure',
                    weight: 15
                },
                {
                    id: 'wifiAccessControlled',
                    title: 'Wi-Fi Security',
                    description: 'Is office Wi-Fi access tightly controlled and changed periodically?',
                    icon: Wifi,
                    category: 'infrastructure',
                    weight: -10 // Negative: lack of control increases risk
                }
            ]
        },
        {
            id: 'awareness-governance',
            title: 'Awareness & Governance',
            description: 'Is cyber risk managed or ignored?',
            questions: [
                {
                    id: 'phishingTrainingProvided',
                    title: 'Phishing Awareness',
                    description: 'Have employees received guidance on phishing or cyber scams?',
                    icon: Shield,
                    category: 'compliance',
                    weight: -15 // Negative: lack of training increases risk
                },
                {
                    id: 'passwordSharingProhibited',
                    title: 'Password Policy',
                    description: 'Is password sharing prohibited and monitored?',
                    icon: Lock,
                    category: 'compliance',
                    weight: -10
                },
                {
                    id: 'accessRevokedOnExit',
                    title: 'Access Revocation',
                    description: 'Are digital accesses revoked immediately when someone leaves?',
                    icon: Users,
                    category: 'compliance',
                    weight: -15
                },
                {
                    id: 'securityPersonDesignated',
                    title: 'Security Responsibility',
                    description: 'Is there a designated person responsible for digital security?',
                    icon: Shield,
                    category: 'compliance',
                    weight: -15
                },
                {
                    id: 'annualRiskReview',
                    title: 'Leadership Review',
                    description: 'Does leadership formally review cyber risks annually?',
                    icon: Briefcase,
                    category: 'compliance',
                    weight: -10
                }
            ]
        },
        {
            id: 'preparedness-recovery',
            title: 'Preparedness & Recovery',
            description: 'If attacked, can you survive it?',
            questions: [
                {
                    id: 'regularBackups',
                    title: 'Data Backups',
                    description: 'Is critical business data backed up regularly?',
                    icon: Database,
                    category: 'operations',
                    weight: -20 // Negative: lack of backups increases risk
                },
                {
                    id: 'backupTested',
                    title: 'Backup Testing',
                    description: 'Have you tested restoring a backup in the past year?',
                    icon: CheckCircle,
                    category: 'operations',
                    weight: -15
                },
                {
                    id: 'mfaEnabled',
                    title: 'Multi-Factor Authentication',
                    description: 'Is multi-factor authentication enabled for key systems?',
                    icon: Lock,
                    category: 'infrastructure',
                    weight: -20
                },
                {
                    id: 'professionalSecuritySoftware',
                    title: 'Security Software',
                    description: 'Are systems protected by professional security software?',
                    icon: Shield,
                    category: 'infrastructure',
                    weight: -15
                },
                {
                    id: 'incidentResponsePlan',
                    title: 'Incident Response Plan',
                    description: 'Do you have a written incident response plan?',
                    icon: AlertTriangle,
                    category: 'compliance',
                    weight: -15
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
