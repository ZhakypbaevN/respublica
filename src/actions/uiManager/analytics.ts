import api from '@/modules/api'
import { IAnalyticsMonthlyStats, IAnalyticsRegionalMemberships, IAnalyticsGenderDemographics, IAnalyticsAgeDemographics } from '@/types/analytics'

export const getMonthlyStatsList = async (filters: any) => {
  return (
    await api.asyncGet<IAnalyticsMonthlyStats[]>(
      '/api/v1/admin/analytics/monthly-stats',
      {
        ...filters,
      },
      true
    )
  ).data
}

export const getAgeDemographics = async () =>
  await api.asyncGet<IAnalyticsAgeDemographics>('/api/v1/admin/analytics/age-demographics')

export const getGenderDemographics = async () =>
  await api.asyncGet<IAnalyticsGenderDemographics>('/api/v1/admin/analytics/gender-demographics')

export const getRegionalMembershipsList = async () =>
  await api.asyncGet<IAnalyticsRegionalMemberships[]>('/api/v1/admin/analytics/regional-memberships')
