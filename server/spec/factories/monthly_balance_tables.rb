# frozen_string_literal: true

FactoryBot.define do
  factory :monthly_balance_table do
    user
    year { Time.zone.now.year }
    month { Time.zone.now.month }
    income { [*0..10_000].sample }
    expenditure { [*0..10_000].sample }
    currency { :yen }
    point { 0 }
    cashless_charge { 0 }
  end
end
