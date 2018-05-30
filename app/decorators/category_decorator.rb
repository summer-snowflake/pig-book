# frozen_string_literal: true

class CategoryDecorator < ApplicationDecorator
  delegate_all

  def success_or_danger_style_class
    balance_of_payments ? 'success' : 'danger'
  end

  def human_balance_of_payments
    balance_of_payments ? I18n.t('label.income') : I18n.t('label.expenditure')
  end
end
