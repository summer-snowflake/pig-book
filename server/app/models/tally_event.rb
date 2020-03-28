# frozen_string_literal: true

class TallyEvent < ApplicationRecord
  belongs_to :user

  # TODO: month: 0 のデータがなくなったタイミングで1..12のvalidationを追加する
end
