export const config = {
  schedule: {
    rule: process.env.CRON!,
    tz: process.env.TIMEZONE ?? 'Etc/UTC',
  },
  zoom: {
    apiKey: process.env.ZOOM_API_KEY!,
    apiSecret: process.env.ZOOM_API_SECRET!,
    meeting: {
      alternativeHosts: process.env.MEETING_ALTERNATIVE_HOSTS,
    }
  },
  slack: {
    botToken: process.env.SLACK_BOT_TOKEN!,
    channelId: process.env.SLACK_CHANNEL_ID!,
  }
};
