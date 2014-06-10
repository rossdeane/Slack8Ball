var config = {};

config.slack = {};

config.slack.baseURL = process.env.SLACK_BASE_URL || '';
config.slack.token = process.env.SLACK_TOKEN || '';

config.server = {};

config.server.port = process.env.EIGHT_BALL_PORT || '3002';

module.exports = config;