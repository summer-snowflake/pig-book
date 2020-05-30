# frozen_string_literal: true

class Dashboard::Fetcher
  attr_reader :user

  def initialize(user:)
    @user = user
  end

  def all
    yearly_data = {}
    user.dashboard_years.each do |year|
      yearly_data[year] = find_by(year: year)
    end
    yearly_data
  end

  def find_by(year:)
    {
      year: year,
      event: user.tally_events.where(year: year).last,
      monthly: monthly_total(year),
      yearly: yearly_total(year),
      yearly_category_income: yearly_category_income(year).with_other,
      yearly_category_expenditure: yearly_category_outgo(year).with_other,
      yearly_breakdown_income: yearly_breakdown_income(year),
      yearly_breakdown_expenditure: yearly_breakdown_outgo(year)
    }
  end

  private

  def monthly_total(year)
    user.monthly_total_balance_tables
        .where(currency: user.profile.currency, year: year)
        .order(:month)
  end

  def yearly_total(year)
    user.yearly_total_balance_tables
        .where(currency: user.profile.currency, year: year).first
  end

  def yearly_category_income(year)
    user.yearly_category_balance_tables
        .where(currency: user.profile.currency, year: year)
        .where.not(income: 0)
        .order(income: :desc)
  end

  def yearly_breakdown_income(year)
    breakdown_income = []
    yearly_category_income(year)
      .group_by(&:category_id).each do |category_id, _records|
      next unless income_category_ids(year).include?(category_id)

      breakdown_income << user.yearly_breakdown_balance_tables
                              .where(currency: user.profile.currency,
                                     year: year, category_id: category_id)
                              .order(income: :desc)
    end
    breakdown_income.flatten + build_other_record(income_category_ids(year))
  end

  def yearly_category_outgo(year)
    user.yearly_category_balance_tables
        .where(currency: user.profile.currency, year: year)
        .where.not(expenditure: 0)
        .order(expenditure: :desc)
  end

  def yearly_breakdown_outgo(year)
    breakdown_outgo = []
    yearly_category_outgo(year)
      .group_by(&:category_id).each do |category_id, _records|
      next unless outgo_category_ids(year).include?(category_id)

      breakdown_outgo << user.yearly_breakdown_balance_tables
                             .where(currency: user.profile.currency,
                                    year: year, category_id: category_id)
                             .order(expenditure: :desc)
    end
    breakdown_outgo.flatten + build_other_record(outgo_category_ids(year))
  end

  def outgo_category_ids(year)
    yearly_category_outgo(year).pluck(:category_id).slice(0, 6)
  end

  def income_category_ids(year)
    yearly_category_income(year).pluck(:category_id).slice(0, 6)
  end

  def build_other_record(target_category_ids)
    return [] if target_category_ids.blank?

    offset_records = user.yearly_breakdown_balance_tables
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
