# frozen_string_literal: true

json.categories do
  json.array! @categories do |category|
    json.id category.id
    json.name category.name
    json.balance_of_payments category.balance_of_payments

    category = category.decorate
    json.success_or_danger_style_class category.success_or_danger_style_class
    json.human_balance_of_payments category.human_balance_of_payments
  end
end
