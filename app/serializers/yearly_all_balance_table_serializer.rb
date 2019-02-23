# frozen_string_literal: true

class YearlyAllBalanceTableSerializer < ActiveModel::Serializer
  attributes :year, :income, :human_income, :expenditure, :human_expenditure

  def human_income
    object.decorate.human_income
  end

  def human_expenditure
    object.decorate.human_expenditure
  end
end
