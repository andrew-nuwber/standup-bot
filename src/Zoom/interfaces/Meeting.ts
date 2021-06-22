import {MeetingTypes} from 'app/Zoom/enums/MeetingTypes';

export interface Meeting {
  uuid: string
  id: number,
  host_id: string,
  host_email: string,
  topic: string,
  type: MeetingTypes,
  status: string,
  start_time: string
  duration: number
  timezone: string,
  created_at: string,
  start_url: string,
  join_url: string,
  password: string,
  h323_password: string,
  pstn_password: string,
  encrypted_password: string,
  settings:{
    host_video: boolean,
    participant_video: boolean,
    cn_meeting: boolean,
    in_meeting: boolean,
    join_before_host: boolean,
    jbh_time: number,
    mute_upon_entry: boolean,
    watermark: boolean,
    use_pmi: boolean,
    approval_type: number,
    audio: string,
    auto_recording: string,
    enforce_login: boolean,
    enforce_login_domains: string,
    alternative_hosts: string,
    close_registration: boolean,
    show_share_button: boolean,
    allow_multiple_devices: boolean,
    registrants_confirmation_email: boolean,
    waiting_room: boolean,
    request_permission_to_unmute_participants: boolean,
    registrants_email_notification: boolean,
    meeting_authentication: boolean,
    encryption_type: string,
    approved_or_denied_countries_or_regions:{
      enable: boolean
    },
    breakout_room:{
      enable: boolean
    },
    alternative_hosts_email_notification: boolean,
    device_testing: boolean
  }
}
