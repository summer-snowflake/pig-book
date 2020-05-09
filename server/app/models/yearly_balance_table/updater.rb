# frozen_string_literal: true

class YearlyBalanceTable::Updater
  include ActiveModel::Model

  attr_reader :user

  validates :year, numericality: { only_integer: true, greater_than: 0 }

  def initialize(user:)
    @user = user
  end

  def update(year:)
    update_yearly(year)
  end

  private

  def update_yearly(year)
    update_total_yearly(year)
    update_category_yearly(year)
  end

  def update_total_yearly(year)
    yearly =
      user.yearly_total_balance_tables
          .find_or_initialize_by(year: year, currency: user.profile.currency)
    yearly.update!(sum_total_params(year))
  end

  def update_category_yearly(year)
    user.monthly_category_balance_tables
        .group_by(&:parent_id).each do |category_id, records|
      category_yearly = user.yearly_category_balance_tables
                            .find_or_initialize_by(
                              year: year,
                              currency: user.profile.currency,
                              parent_id: category_id
                            )
      category_yearly.update!(sum_params(records))
    end
  end

  def sum_total_params(year)
    monthly = user.monthly_total_balance_tables
                  .where(year: year, currency: user.profile.currency)
    sum_params(monthly)
  end

  def sum_params(monthly)
    {
      income: monthly.inject(0) { |sum, m| sum + m.income },
      expenditure: monthly.inject(0) { |sum, m| sum + m.expenditure },
      cashless_charge: monthly.inject(0) { |sum, m| sum + m.cashless_charge },
      point: monthly.inject(0) { |sum, m| sum + m.point }
    }
  end
end
