import { MapParameters } from './mapParams';
import _ from 'lodash';
import { PlaceIndexParameters } from './placeIndexParams';

export type GeoParameters = MapParameters | PlaceIndexParameters;

// Merges other with existing in a non-destructive way.
// Specifically, scalar values will not be overwritten
// Objects will have field added but not removed or modified
// Arrays will be appended to, duplicates are removed
export function merge(existing: Partial<GeoParameters>, other?: Partial<GeoParameters>): Partial<GeoParameters> {
    const mergeFunc = (oldVal: any, newVal: any) => {
      if (!_.isObject(oldVal)) {
        return oldVal;
      }
      if (_.isArray(oldVal)) {
        return _.uniqWith(oldVal.concat(newVal), _.isEqual);
      }
    };
    if (!other) return existing;
    return _.mergeWith(existing, other, mergeFunc);
  }
