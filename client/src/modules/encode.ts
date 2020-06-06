import { RecordSearchParams, QueryParams } from 'types/api'

const convertToQueryParams = (data: RecordSearchParams): QueryParams => {
  return {
    published_at: String(data.date || ''),
    page: String(data.page === 1 ? '' : data.page),
    year: String(data.year || ''),
    month: String(data.month || ''),
    order: String(data.order),
    category_id: String(data.category_id || ''),
    breakdown_id: String(data.breakdown_id  || ''),
    place_id: String(data.place_id || ''),
    tag_ids: data.tag_ids?.toString() || ''
  }
}

export const encodeQueryData = (data: RecordSearchParams): string => {
  const params = convertToQueryParams(data)
  const ret = []
  for (const [k, v] of Object.entries(params))
    if (v !== '') {
      ret.push(encodeURIComponent(k) + '=' + encodeURIComponent(v))
    }

  return ret.join('&')
}
