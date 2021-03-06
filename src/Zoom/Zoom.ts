import got, {Got, HTTPError} from 'got';
import * as jwt from 'jsonwebtoken';
import {DateTime} from 'luxon';
import {MeetingParams} from 'app/Zoom/interfaces/MeetingParams';
import {Meeting} from 'app/Zoom/interfaces/Meeting';
import {RequestError} from 'got/dist/source/core';

export class Zoom {
  private readonly got: Got;

  constructor(private apiKey: string, private apiSecret: string) {
    this.got = got.extend({
      prefixUrl: 'https://api.zoom.us/v2/',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 1000,
    });
  }

  async createMeeting(params: MeetingParams): Promise<Meeting> {
    const token = await this.getJwtToken();

    try {
      return await this.got.post('users/me/meetings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        json: {
          topic: params.topic,
          type: params.type,
          start_time: params.startTime?.toISO(),
          timezone: params.startTime?.zoneName,
          settings: {
            host_video: true,
            participant_video: true,
            join_before_host: true,
            waiting_room: false,
            additional_data_center_regions: ['EU'],
            registrants_email_notification: false,
            registrants_confirmation_email: false,
            alternative_hosts_email_notification: false,
          }
        }
      }).json<Meeting>();
    } catch (e) {
      if (e instanceof RequestError) {
        throw new Error(`Request error while creating Zoom meeting: ${e.response?.body || e.message}`);
      }

      throw e;
    }
  }

  getJwtToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      const payload = {
        iss: this.apiKey,
        exp: DateTime.now().plus({second: 10}).toMillis()
      };

      return jwt.sign(
        payload,
        this.apiSecret,
        (err, token) => err ? reject(err) : resolve(token!)
      );
    });

  }
}
