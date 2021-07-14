import './preload';
import * as schedule from 'node-schedule';
import {config} from 'app/config';
import {Zoom} from 'app/Zoom/Zoom';
import {MeetingTypes} from 'app/Zoom/enums/MeetingTypes';
import {DateTime} from 'luxon';
import {WebClient as Slack} from '@slack/web-api';

const slack = new Slack(config.slack.botToken);
const zoom = new Zoom(config.zoom.apiKey, config.zoom.apiSecret);

schedule.scheduleJob(config.schedule, async () => {
  const meeting = await zoom.createMeeting({
    topic: 'Standup',
    type: MeetingTypes.SCHEDULED,
    startTime: DateTime.local().plus({second: 1}),
  });

  await slack.chat.postMessage({
    channel: config.slack.channelId,
    text: meeting.join_url,
  });
});
