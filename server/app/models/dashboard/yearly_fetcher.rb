# frozen_string_literal: true

class Dashboard::YearlyFetcher
  attr_reader :user, :year

  def initialize(user:, year:)
    @user = user
    @year = year
  end

  def build
    {
      year: year,
      event: event,
      monthly: monthly_total,
      yearly: yearly_total,
      yearly_category_income: yearly_category_income.with_other,
      yearly_category_expenditure: yearly_category_outgo.with_other,
      yearly_breakdown_income: yearly_breakdown_income,
      yearly_breakdown_expenditure: yearly_breakdown_outgo
    }
  end

  private

  def event
    user.last_tally_event(year: year)
  end

  def monthly_total
    user.monthly_total_balance_tables
        .where(currency: user.profile.currency, year: year)
        .order(:month)
  end

  def yearly_total
    user.yearly_total_balance_tables
        .where(currency: user.profile.currency, year: year)
        .first
  end

  def yearly_category_income
    user.yearly_category_balance_tables
        .where(currency: user.profile.currency, year: year)
        .where.not(income: 0)
        .order(income: :desc)
  end

  def yearly_category_outgo
    user.yearly_category_balance_tables
        .where(currency: user.profile.currency, year: year)
        .where.not(expenditure: 0)
        .order(expenditure: :desc)
  end

  def yearly_breakdown_income
    breakdown_income = []
    yearly_category_income
      .group_by(&:category_id).each do |category_id, _records|
      next unless income_category_ids.include?(category_id)

      breakdown_income << user.yearly_breakdown_balance_tables
                              .where(currency: user.profile.currency,
                                     year: year, category_id: category_id)
                              .order(income: :desc)
    end
    breakdown_income.flatten + build_other_record(income_category_ids)
  end

  def yearly_breakdown_outgo
    breakdown_outgo = []
    yearly_category_outgo
      .group_by(&:category_id).each do |category_id, _records|
      next unless outgo_category_ids.include?(category_id)

      breakdown_outgo << user.yearly_breakdown_balance_tables
                             .where(currency: user.profile.currency,
                                    year: year, category_id: category_id)
                             .order(expenditure: :desc)
    end
    breakdown_outgo.flatten + build_other_record(outgo_category_ids)
  end

  def income_category_ids
    yearly_category_income.pluck(:category_id).slice(0, 6)
  end

  def outgo_category_ids
    yearly_category_outgo.pluck(:category_id).slice(0, 6)
  end

  def build_other_record(target_category_ids)
    return [] if target_category_ids.blank?

    offset_records = user.yearly_breakdown_balance_tables
                         .where(year: year)
                         .where.not(category_id: target_category_ids)
    balance = user.categories.find(target_category_ids.last).balance_of_payments
    condition = balance ? { income: 0 } : { expenditure: 0 }
    offset_records = offset_records.where.not(condition)
    return [] if offset_records.count.zero?

    build_yearly_breakdown(offset_records)
  end

  def build_yearly_breakdown(offset_records)
    [user.yearly_breakdown_balance_tables.build(
      user_id: user.id, category_id: nil,
      label: I18n.t('label.other'),
      year: offset_records.last.year,
      currency: user.profile.currency,
      income: offset_records.pluck(:income).sum,
      expenditure: offset_records.pluck(:expenditure).sum,
      cashless_charge: offset_records.pluck(:cashless_charge).sum,
      point: offset_records.pluck(:point).sum
    )]
  end
end
