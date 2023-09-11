import got, {Got, RequestError} from 'got';
import {MeetingParams} from 'app/Zoom/interfaces/MeetingParams';
import {Meeting} from 'app/Zoom/interfaces/Meeting';
import {Credentials} from 'app/Zoom/interfaces/Credentials';

export class Zoom {
  private readonly got: Got;

  constructor(private accountId: string, private clientId: string, private clientSecret: string) {
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
    const token = await this.getAuthToken();

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

  async getAuthToken(): Promise<string> {
    const response = await got.post('https://zoom.us/oauth/token', {
      form: {grant_type: 'account_credentials', account_id: this.accountId},
      headers: {Authorization: `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`},
    }).json<Credentials>();

    return response.access_token;
  }
}
