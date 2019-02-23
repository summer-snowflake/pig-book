# frozen_string_literal: true

class YearlyAllBalanceTableSerializer < ActiveModel::Serializer
  attributes :year, :income :human_income, :expenditure, :human_expenditure

  def human_income
  end

  def human_expenditure
  end
end
