# frozen_string_literal: true

class MonthlyBalanceTableSerializer < ActiveModel::Serializer
  attributes :id, :year_and_month, :month, :human_month,
             :income, :human_income, :expenditure, :human_expenditure, :point

  def human_income
    object.decorate.human_income
  end

  def human_expenditure
    object.decorate.human_expenditure
  end

  def human_month
    object.decorate.human_month
  end
end
