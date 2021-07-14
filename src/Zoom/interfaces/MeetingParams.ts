import {DateTime} from 'luxon';
import {MeetingTypes} from 'app/Zoom/enums/MeetingTypes';

export interface MeetingParams {
  topic: string;
  type: MeetingTypes;
  startTime?: DateTime,
}
