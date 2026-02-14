export type FirmType = 'IT' | 'Non-IT';

export interface AssessmentResponses {
    firmType: FirmType;

    // Phase 1: Digital Footprint
    usesEmail: boolean;
    usesDigitalPayments: boolean;
    hasWebsiteOrApp: boolean;

    // Phase 2: Risk Factors
    hasPublicIPs: boolean; // Do you have servers exposed to internet?
    storesCustomerData: boolean; // PII/Financial
    remoteWork: boolean; // Do employees work remotely?
    regulatoryMandates: boolean; // ISO/RBI/GDPR etc.
    criticalDowntime: boolean; // Is downtime expensive?
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
    // Phase 1 Check
    const hasDigitalPresence = data.usesEmail || data.usesDigitalPayments || data.hasWebsiteOrApp;

    if (!hasDigitalPresence) {
        return {
            score: 0,
            riskLevel: 'Low',
            recommendations: [
                { service: 'Basic Cyber Hygiene', description: 'Start with secure passwords and awareness.', priority: 'Recommended' }
            ],
            breakdown: { exposure: 0, dataSensitivity: 0, regulatory: 0, operational: 0 }
        };
    }

    let score = 0;

    // Weights (0-100 scale components)
    // IT: Exposure (30), Data (30), Reg (20), Ops (20)
    // Non-IT: Exposure (15), Data (25), Reg (20), Ops (40)

    const isIT = data.firmType === 'IT';

    // 1. External Exposure
    let exposureScore = 0;
    if (data.hasWebsiteOrApp) exposureScore += 50;
    if (data.hasPublicIPs) exposureScore += 50;

    // 2. Data Sensitivity
    let dataScore = 0;
    if (data.storesCustomerData) dataScore += 100;
    else if (data.usesDigitalPayments) dataScore += 50;

    // 3. Regulatory
    let regScore = 0;
    if (data.regulatoryMandates) regScore += 100;

    // 4. Operational
    let opsScore = 0;
    if (data.criticalDowntime) opsScore += 60;
    if (data.remoteWork) opsScore += 40;

    // Calculate Weighted Score
    if (isIT) {
        score += exposureScore * 0.30;
        score += dataScore * 0.30;
        score += regScore * 0.20;
        score += opsScore * 0.20;
    } else {
        score += exposureScore * 0.15;
        score += dataScore * 0.25;
        score += regScore * 0.20;
        score += opsScore * 0.40;
    }

    const finalScore = Math.min(100, Math.round(score));

    // Determine Risk Level & Recommendations
    let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
    const recommendations = [];

    if (finalScore > 70) {
        riskLevel = 'High';
        recommendations.push({ service: 'VAPT (Vulnerability Assessment)', description: 'Comprehensive testing of your exposed assets.', priority: 'Critical' });
        recommendations.push({ service: '24/7 Monitoring (SOC)', description: 'Real-time threat detection.', priority: 'Recommended' });
    } else if (finalScore > 30) {
        riskLevel = 'Medium';
        recommendations.push({ service: 'Endpoint Protection', description: 'Antivirus and firewall for devices.', priority: 'Critical' });
        recommendations.push({ service: 'Compliance Audit', description: 'Review against standard frameworks.', priority: 'Recommended' });
    } else {
        riskLevel = 'Low';
        recommendations.push({ service: 'Employee Training', description: 'Phishing awareness and safe practices.', priority: 'Recommended' });
    }

    // Specific triggers
    if (data.regulatoryMandates && !recommendations.some(r => r.service.includes('Compliance'))) {
        recommendations.push({ service: 'Compliance Audit', description: 'Ensure adherence to required standards.', priority: 'Critical' });
    }

    if (data.storesCustomerData && riskLevel !== 'High') {
        recommendations.push({ service: 'Data Protection Impact Assessment', description: 'Evaluate risks to customer data.', priority: 'Recommended' });
    }

    return {
        score: finalScore,
        riskLevel,
        recommendations: recommendations as any, // Cast to avoid strict literal type matching issues if any
        breakdown: {
            exposure: exposureScore,
            dataSensitivity: dataScore,
            regulatory: regScore,
            operational: opsScore
        }
    };
}
