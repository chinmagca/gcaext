export type FirmType = 'IT' | 'Non-IT';

export interface AssessmentResponses {
    firmType: FirmType;

    // Original Questionnaire: Infrastructure & Digital Assets
    usesEmail: boolean;
    hasWebsiteOrApp: boolean;
    usesCloudServices: boolean;
    hasOnPremiseServers: boolean;
    hasPublicFacingSystems: boolean;
    hasThirdPartyIntegrations: boolean;

    // Original Questionnaire: Data Handling & Sensitivity
    collectsCustomerData: boolean;
    handlesFinancialData: boolean;
    storesEmployeeData: boolean;
    hasProprietaryData: boolean;
    handlesHealthData: boolean;
    retainsDataLongTerm: boolean;

    // Original Questionnaire: Operations & Dependencies
    acceptsDigitalPayments: boolean;
    hasRemoteWork: boolean;
    criticalUptime: boolean;
    revenueDependent: boolean;
    hasCustomerFacingSystems: boolean;
    hasSupplyChainIntegration: boolean;

    // Original Questionnaire: Compliance & Risk Exposure
    hasRegulatoryCompliance: boolean;
    hasIndustryRegulations: boolean;
    hadPreviousIncidents: boolean;
    hasCyberInsurance: boolean;
    providesSecurityTraining: boolean;

    // Questionnaire 2: Digital Dependency
    reliesOnDigitalChannels: boolean;
    revenueImpactFromDowntime: boolean;
    digitalBusinessProcesses: boolean;
    remoteSystemAccess: boolean;
    digitalPaymentAcceptance: boolean;

    // Questionnaire 2: Data Value & Sensitivity
    storesCustomerData: boolean;
    storesBankDetails: boolean;
    handlesConfidentialInfo: boolean;
    breachWouldDamageTrust: boolean;
    leakHasLegalConsequences: boolean;

    // Questionnaire 2: Exposure Surface
    personalDevicesForWork: boolean;
    multipleCloudTools: boolean;
    iotDevicesConnected: boolean;
    frequentExternalSharing: boolean;
    wifiAccessControlled: boolean;

    // Questionnaire 2: Awareness & Governance
    phishingTrainingProvided: boolean;
    passwordSharingProhibited: boolean;
    accessRevokedOnExit: boolean;
    securityPersonDesignated: boolean;
    annualRiskReview: boolean;

    // Questionnaire 2: Preparedness & Recovery
    regularBackups: boolean;
    backupTested: boolean;
    mfaEnabled: boolean;
    professionalSecuritySoftware: boolean;
    incidentResponsePlan: boolean;

    // Questionnaire 3: Digital Dependency Pulse
    businessStopsWithoutTech: boolean;
    usesCloudTools: boolean;
    remoteWorkEnabled: boolean;
    personalDevicesUsed: boolean;
    websiteAppDependency: boolean;

    // Questionnaire 3: Value & Sensitivity Target
    storesCustomerInfo: boolean;
    holdsTradeSecrets: boolean;
    leakCausesLegalTrouble: boolean;
    clientsAskAboutSecurity: boolean;
    reputationBuiltOnTrust: boolean;

    // Questionnaire 3: Financial Risk Wallet
    storesVendorBankDetails: boolean;
    digitalBillingPayroll: boolean;
    dependsOnSaasVendors: boolean;
    emailHackRiskPaymentDiversion: boolean;

    // Questionnaire 3: Human Awareness Culture
    phishingTrainingGiven: boolean;
    strictPasswordPolicy: boolean;
    accessRevokedImmediately: boolean;
    seenSuspiciousActivity: boolean;
    hasTechSupportPerson: boolean;

    // Questionnaire 3: Safety Net Recovery
    hasSecureBackup: boolean;
    usesMfaForBanking: boolean;
    hasPaidAntivirus: boolean;
    hasWrittenIncidentPlan: boolean;
    leadershipDiscussesRisks: boolean;
}

export interface AssessmentResult {
    score: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    recommendations: {
        service: string;
        description: string;
        priority: 'Critical' | 'Recommended' | 'Optional';
    }[];
    breakdown: {
        exposure: number;
        dataSensitivity: number;
        regulatory: number;
        operational: number;
    };
}

export function calculateScore(data: AssessmentResponses): AssessmentResult {
    const isIT = data.firmType === 'IT';

    // 1. Infrastructure Exposure (0-100)
    let infrastructureScore = 0;
    if (data.usesEmail) infrastructureScore += 10;
    if (data.hasWebsiteOrApp) infrastructureScore += 20;
    if (data.usesCloudServices) infrastructureScore += 20;
    if (data.hasOnPremiseServers) infrastructureScore += 15;
    if (data.hasPublicFacingSystems) infrastructureScore += 25;
    if (data.hasThirdPartyIntegrations) infrastructureScore += 10;

    // 2. Data Sensitivity (0-100)
    let dataSensitivityScore = 0;
    if (data.collectsCustomerData) dataSensitivityScore += 15;
    if (data.handlesFinancialData) dataSensitivityScore += 30;
    if (data.storesEmployeeData) dataSensitivityScore += 10;
    if (data.hasProprietaryData) dataSensitivityScore += 20;
    if (data.handlesHealthData) dataSensitivityScore += 20;
    if (data.retainsDataLongTerm) dataSensitivityScore += 5;

    // 3. Operational Dependency (0-100)
    let operationalScore = 0;
    if (data.acceptsDigitalPayments) operationalScore += 20;
    if (data.hasRemoteWork) operationalScore += 15;
    if (data.criticalUptime) operationalScore += 25;
    if (data.revenueDependent) operationalScore += 25;
    if (data.hasCustomerFacingSystems) operationalScore += 10;
    if (data.hasSupplyChainIntegration) operationalScore += 5;

    // 4. Compliance & Risk (0-100)
    let complianceScore = 0;
    if (data.hasRegulatoryCompliance) complianceScore += 40;
    if (data.hasIndustryRegulations) complianceScore += 30;
    if (data.hadPreviousIncidents) complianceScore += 20;
    if (!data.hasCyberInsurance) complianceScore += 5; // Lack of insurance is a risk
    if (!data.providesSecurityTraining) complianceScore += 5; // Lack of training is a risk

    // Calculate Weighted Score based on firm type
    let finalScore = 0;
    if (isIT) {
        finalScore += infrastructureScore * 0.30;
        finalScore += dataSensitivityScore * 0.25;
        finalScore += operationalScore * 0.25;
        finalScore += complianceScore * 0.20;
    } else {
        finalScore += infrastructureScore * 0.20;
        finalScore += dataSensitivityScore * 0.30;
        finalScore += operationalScore * 0.30;
        finalScore += complianceScore * 0.20;
    }

    finalScore = Math.min(100, Math.round(finalScore));

    // Determine Risk Level
    let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
    if (finalScore > 70) {
        riskLevel = 'High';
    } else if (finalScore > 35) {
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
            exposure: infrastructureScore,
            dataSensitivity: dataSensitivityScore,
            regulatory: complianceScore,
            operational: operationalScore
        }
    };
}
