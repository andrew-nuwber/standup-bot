import * as process from 'process';

export const config = {
  schedule: {
    rule: process.env.CRON!,
    tz: process.env.TIMEZONE ?? 'Etc/UTC',
  },
  zoom: {
    accountId: process.env.ZOOM_ACCOUNT_ID!,
    clientId: process.env.ZOOM_CLIENT_ID!,
    clientSecret: process.env.ZOOM_CLIENT_SECRET!,
  },
  slack: {
    botToken: process.env.SLACK_BOT_TOKEN!,
    channelId: process.env.SLACK_CHANNEL_ID!,
  }
};
