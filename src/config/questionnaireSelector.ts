import { defaultQuestionnaireConfig, type QuestionnaireConfig } from './questionnaireConfig';
import { questionnaire2Config } from './questionnaire2Config';
import { questionnaire3Config } from './questionnaire3Config';
export type { QuestionnaireConfig } from './questionnaireConfig';

/**
 * Questionnaire Selector
 * 
 * Change the ACTIVE_QUESTIONNAIRE constant to switch between different questionnaire sets:
 * - 'default': Original 5-step questionnaire (Infrastructure, Data Handling, Operations, Compliance)
 * - 'questionnaire2': Detailed 5-category assessment (Digital Dependency, Data Value, Exposure Surface, Governance, Recovery)
 * - 'questionnaire3': User-friendly "Check" format (Pulse, Target, Wallet, Culture, Recovery)
 */

export type QuestionnaireVariant = 'default' | 'questionnaire2' | 'questionnaire3';

// 🔧 CHANGE THIS TO SWITCH QUESTIONNAIRES
export const ACTIVE_QUESTIONNAIRE: QuestionnaireVariant = 'default';

/**
 * Get the active questionnaire configuration
 */
export function getActiveQuestionnaireConfig(): QuestionnaireConfig {
    switch (ACTIVE_QUESTIONNAIRE) {
        case 'questionnaire2':
            return questionnaire2Config;
        case 'questionnaire3':
            return questionnaire3Config;
        case 'default':
        default:
            return defaultQuestionnaireConfig;
    }
}

/**
 * Get all available questionnaire configurations
 */
export function getAllQuestionnaireConfigs(): Record<QuestionnaireVariant, QuestionnaireConfig> {
    return {
        default: defaultQuestionnaireConfig,
        questionnaire2: questionnaire2Config,
        questionnaire3: questionnaire3Config
    };
}

/**
 * Get questionnaire metadata
 */
export function getQuestionnaireMetadata(variant: QuestionnaireVariant) {
    const metadata = {
        default: {
            name: 'Original Assessment',
            description: 'Comprehensive 5-step assessment covering infrastructure, data, operations, and compliance',
            steps: 5,
            questions: 23
        },
        questionnaire2: {
            name: 'Detailed Security Assessment',
            description: 'In-depth evaluation of digital dependency, data value, exposure surface, governance, and recovery',
            steps: 5,
            questions: 25
        },
        questionnaire3: {
            name: 'Business-Friendly Assessment',
            description: 'Simplified assessment using practical "check" metaphors (Pulse, Target, Wallet, Culture, Recovery)',
            steps: 5,
            questions: 25
        }
    };

    return metadata[variant];
}
