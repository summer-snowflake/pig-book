# frozen_string_literal: true

json.cache! [place], expires_in: 1.hours do
  json.id place.id
  json.name place.name
end
