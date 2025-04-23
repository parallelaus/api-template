"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
// check that all required environment variables are present
// most have defaults, but those without defaults needs to be
// specified
// Common required variable
const requiredVariables = [];
requiredVariables.forEach((field) => {
    if (!process.env[field]) {
        throw 'Required evnironment variable not set: ' + field;
    }
});
exports.Environment = {
    server: {
        // local - local development
        // uat - User Acceptance Testing
        // prod - production
        // test - test scripts
        node_env: process.env.NODE_ENV || 'local',
        // api - api server (event_queue kafka or no-queue)
        // webhooks - webhook endpoint (event_queue kafka)
        // event-handler - starts kafka event handler (event_queue kafka)
        // webhooks-event-handler - start both webhooks and event handler (event_queue kafka or no-queue)
        // combo - combination of all required services on a single service
        mode: process.env.SERVER_MODE || 'api',
        status: process.env.SERVER_STATUS || 'ok',
        port: process.env.SERVER_PORT || 3001,
        no_db_exit: process.env.NO_DB_EXIT || 'false', // Exit process when not connected to DB
    },
    event_queue: process.env.EVENT_QUEUE || 'kafka', // 'no-queue'
    user_frontend: {
        app_name: process.env.APP_NAME || 'GetMe.video',
        url: process.env.USER_FRONTEND_URL || 'https://app.getme.video/',
    },
    website: {
        url: process.env.WEBSITE_URL || 'https://getme.video/',
        subscribe_success_page: process.env.WEBSITE_SUBSCRIBE_SUCCESS_PAGE || 'welcome',
        pricing_page: process.env.WEBSITE_PRICING_PAGE || 'pricing',
    },
    mongo_db: {
        protocol: process.env.MONGO_DB_PROTOCOL || 'mongodb',
        host: process.env.MONGO_DB_HOST || '127.0.0.1',
        port: process.env.MONGO_DB_PORT || null,
        name: process.env.MONGO_DB_NAME || 'getmevideo',
        options: process.env.MONGO_DB_OPTIONS || null,
        username: process.env.MONGO_DB_USERNAME || null,
        password: process.env.MONGO_DB_PASSWORD || null,
        uri: process.env.MONGO_DB_URI || null,
    },
    oauth2: {
        jwt_secret: process.env.JWT_SECRET_KEY,
        access_token_ttl: parseInt(process.env.ACCESS_TOKEN_TTL || '86400'),
    },
    email: {
        disabled: process.env.EMAIL_DISABLED || false,
        from_email: process.env.EMAIL_FROM_EMAIL || 'support@getme.video',
        from_name: process.env.EMAIL_FROM_NAME || 'GetMe.Video',
        mailjet: {
            api_key: process.env.EMAIL_MAILJET_API_KEY,
            api_secret: process.env.EMAIL_MAILJET_API_SECRET,
            webhook: {
                key: process.env.MAILJET_WEBHOOK_USERNAME || '7puP1Ff6AIZ4n34y',
                secret: process.env.MAILJET_WEBHOOK_USERNAME ||
                    '9T9jfOTvnAYEECZOrr7ILpgoONHtSz6dv8c4rYCwe789gvds3',
            },
            lists: {
                free_accounts: process.env.EMAIL_MAILJET_LISTS_FREE_ACCOUNTS,
                subscribers: process.env.EMAIL_MAILJET_LISTS_SUBSCRIBERS,
                applicants: process.env.EMAIL_MAILJET_LISTS_APPLICANTS,
            },
            workflows: {
                // Reminder to new user to set their password and log in
                // Used up to Oct 2024 - now replaced with first login reminder workflow
                new_user_set_password: process.env.EMAIL_MAILJET_WORKFLOWS_NEW_USER_SET_PASSWORD,
                new_user_welcome: process.env.EMAIL_MAILJET_WORKFLOWS_NEW_USER_WELCOME,
                // Send emails out to remind user to visit app for the first time
                // and set their password
                first_login_reminder: process.env.EMAIL_MAILJET_WORKFLOWS_FIRST_LOGIN_REMINDER,
            },
            templates: {
                en: {
                    interview_pin: process.env.EMAIL_MAILJET_TEMPLATES_EN_INTERVIEW_PIN,
                    reset_password: process.env.EMAIL_MAILJET_TEMPLATES_EN_RESET_PASSWORD,
                    payment_failed: process.env.EMAIL_MAILJET_TEMPLATES_PAYMENT_FAILED,
                    payment_failed_final: process.env.EMAIL_MAILJET_TEMPLATES_PAYMENT_FAILED_FINAL,
                    payment_succeeded: process.env.EMAIL_MAILJET_TEMPLATES_PAYMENT_SUCCEEDED,
                    subcription_suspended: process.env.EMAIL_MAILJET_TEMPLATES_SUBSCRIPTION_SUSPENDED,
                    subcription_reinstated: process.env.EMAIL_MAILJET_TEMPLATES_SUBSCRIPTION_REINSTATED,
                },
            },
        },
    },
    defaults: {
        plan: process.env.DEFAULTS_PLAN || 'f16ecba5a2d660c0a728d9ca',
        account: {
            limits: {
                max_users: process.env.DEFAULTS_ACCOUNT_LIMITS_MAX_USERS || 1,
                max_question_sets: process.env.DEFAULTS_ACCOUNT_LIMITS_MAX_QUESTION_SETS || 1,
                max_archived_question_sets: process.env.DEFAULTS_ACCOUNT_LIMITS_MAX_ARCHIVED_QUESTION_SETS || 0,
                max_monthly_applicants: process.env.DEFAULTS_ACCOUNT_LIMITS_MAX_MONTHLY_APPLICANTS || 5,
                max_monthly_minutes: process.env.DEFAULTS_ACCOUNT_LIMITS_MAX_MONTHLY_MINUTES || 20,
                max_monthly_ai_question_sets: process.env.DEFAULTS_ACCOUNT_LIMITS_MAX_MONTHLY_AI_QUESTION_SETS || 0,
            },
        },
        interview: {
            video_responses: {
                min_thinking_time: process.env.DEFAULTS_INTERVIEW_VIDEO_RESPONSES_MAX_THINKING_TIME ||
                    30,
                max_thinking_time: process.env.DEFAULTS_INTERVIEW_VIDEO_RESPONSES_MAX_THINKING_TIME ||
                    -1,
                max_response_time: process.env.DEFAULTS_INTERVIEW_VIDEO_RESPONSES_MAX_RESPONSE_TIME ||
                    300,
                min_response_time: process.env.DEFAULTS_INTERVIEW_VIDEO_RESPONSES_MIN_RESPONSE_TIME || 0,
                max_takes: process.env.DEFAULTS_INTERVIEW_VIDEO_RESPONSES_MAX_TAKES || -1,
                max_sessions: process.env.DEFAULTS_INTERVIEW_VIDEO_RESPONSES_MAX_SESSIONS || -1,
                max_session_days: process.env.DEFAULTS_INTERVIEW_VIDEO_RESPONSES_MAX_SESSION_DAYS || 10,
            },
        },
    },
    stripe: {
        api_key: process.env.STRIPE_API_KEY,
        // Upgraded: 2023-10-23
        // api_version: process.env.STRIPE_API_VERSION || '2022-11-15',
        api_version: process.env.STRIPE_API_VERSION || '2023-10-16',
        webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
        active_currencies: process.env.STRIPE_ACTIVE_CURRENCIES || 'USD,GBP,ZAR,AUD,NZD,SGD,EUR',
    },
    // files: {
    //   temp_upload_dir: process.env.FILE_TEMP_UPLOAD_DIR || 'file_store/tmp/',
    //   storage_engine: process.env.FILE_STORAGE_ENGINE || 'fs',
    //   fs: {
    //     directory: process.env.FILE_STORAGE_FS_DIRECTORY || 'file_store/',
    //   },
    // },
    kafka: {
        clientId: process.env.KAFKA_CLIENT_ID || 'GetMe.Video Event Handler',
        security: {
            protocol: process.env.KAFKA_SECURITY_PROTOCOL || 'SASL_SSL',
        },
        bootstrap: {
            servers: process.env.KAFKA_BOOTSTRAP_SERVERS,
        },
        sasl: {
            username: process.env.KAFKA_SASL_USERNAME,
            password: process.env.KAFKA_SASL_PASSWORD,
            mechanism: process.env.KAFKA_SASL_MECHANISM || 'plain',
        },
        dr_msg_cb: process.env.KAFKA_DR_MSG_CB || true,
        topics: {
            stripe_events: process.env.KAFKA_TOPICS_STRIPE_EVENTS || 'stripe-events',
            user_events: process.env.KAFKA_TOPICS_USER_EVENTS || 'user-events',
            mailjet_events: process.env.KAFKA_TOPICS_MAILJET_EVENTS || 'mailjet-events',
        },
    },
    openai: {
        api_key: process.env.OPENAI_API_KEY,
    },
};
