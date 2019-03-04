# frozen_string_literal: true

class CsvFile < ApplicationRecord
  include CsvUploader[:csv]
end
