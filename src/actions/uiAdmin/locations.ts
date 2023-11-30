import api from '@/modules/api'
import { ILocation } from "@/types/location";
import { Paginator } from '@/types/request';

export const getLocationsList = async () =>
  await api.asyncGet<Paginator<ILocation[]>>('/api/v1/parties/locations')