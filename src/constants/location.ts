import { City, State } from 'country-state-city'

export const BR_STATES = State.getStatesOfCountry('BR').map((s) => ({
  label: s.name,
  value: s.isoCode
}))

export const getCitiesByState = (stateCode: string) =>
  City.getCitiesOfState('BR', stateCode).map((c) => ({
    label: c.name,
    value: c.name
  }))
