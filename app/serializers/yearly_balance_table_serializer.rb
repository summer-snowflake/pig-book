# frozen_string_literal: true

class YearlyBalanceTableSerializer < ActiveModel::Serializer
  attributes :id, :human_total_income, :human_total_expenditure

  def human_total_income
    object.decorate.human_total_income
  end

  def human_total_expenditure
    object.decorate.human_total_expenditure
  end
end
