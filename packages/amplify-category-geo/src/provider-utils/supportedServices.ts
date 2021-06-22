import { MapParameters } from './awscloudformation/utils/mapParams';
import { createMapWalkthrough, updateMapWalkthrough } from './awscloudformation/service-walkthroughs/mapWalkthrough';
import * as geoController from './awscloudformation';
import { createPlaceIndexWalkthrough, updatePlaceIndexWalkthrough } from './awscloudformation/service-walkthroughs/placeIndexWalkthrough';
import { PlaceIndexParameters } from './awscloudformation/utils/placeIndexParams';

export interface SupportedServices extends Record<string, any> {
  Map: ServiceConfig<MapParameters>;
}

export interface ServiceConfig<T> {
  alias: string;
  walkthroughs: WalkthroughProvider<T>;
  provider: string;
  providerController: any;
}

export interface WalkthroughProvider<T> {
  createWalkthrough: (context: any, params: Partial<T>) => Promise<Partial<T>>;
  updateWalkthrough: (context: any, resourceToUpdate?: string, params?: Partial<T>) => Promise<Partial<T>>;
}

export const supportedServices: SupportedServices = {
  Map: {
    alias: 'Map (visualize the geospatial data)',
    walkthroughs: {
      createWalkthrough: createMapWalkthrough,
      updateWalkthrough: updateMapWalkthrough
    },
    provider: 'awscloudformation',
    providerController: geoController,
  },
  PlaceIndex: {
    alias: 'Place Index (search places, geocode and reverse geocode)',
    walkthroughs: {
      createWalkthrough: createPlaceIndexWalkthrough,
      updateWalkthrough: updatePlaceIndexWalkthrough
    },
    provider: 'awscloudformation',
    providerController: geoController,
  },
  Tracker: {
    alias: 'Tracker (track asset location)',
    walkthroughs: {
      createWalkthrough: null,
      updateWalkthrough: null
    },
    provider: 'awscloudformation',
    providerController: geoController,
  },
  GeofenceCollection: {
    alias: 'Geofence Collection (create virtual perimeters and get breach notifications)',
    walkthroughs: {
      createWalkthrough: null,
      updateWalkthrough: null
    },
    provider: 'awscloudformation',
    providerController: geoController,
  }
};
