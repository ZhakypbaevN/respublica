export interface IAnalyticsMonthlyStats {
  month: string,
  registered_users: number,
  joined_memberships: number,
  approved_resignations: number
}

export interface IAnalyticsAgeDemographics{
  under_18: number,
  age_18_25: number,
  age_26_35: number,
  age_36_45: number,
  over_45: number
}

export interface IAnalyticsRegionalMemberships {
  location_name: string,
  location_id: number,
  memberships_count: number
}

export interface IAnalyticsGenderDemographics{
  male: number,
  female: number
}