# frozen_string_literal: true

class MonthlyBalanceTableSerializer < ActiveModel::Serializer
  attributes :id, :beginning_at, :income, :human_income,
             :expenditure, :human_expenditure

  def human_income
    object.decorate.human_income
  end

  def human_expenditure
    object.decorate.human_expenditure
  end
end
