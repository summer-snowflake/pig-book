# frozen_string_literal: true

class CategoryDecorator < ApplicationDecorator
  delegate_all

  def human_balance_of_payments
    balance_of_payments ? I18n.t('label.income') : I18n.t('label.expenditure')
  end
end
