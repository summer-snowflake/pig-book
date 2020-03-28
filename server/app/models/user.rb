# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_one :admin, dependent: :destroy
  has_one :profile, dependent: :destroy
  has_many :categories, dependent: :destroy
  has_many :breakdowns, dependent: :destroy
  has_many :places, dependent: :destroy
  has_many :records, dependent: :destroy
  has_many :tally_events, dependent: :destroy
  has_many :monthly_balance_tables, dependent: :destroy

  def admin?
    !admin.nil?
  end

  def total
    {
      category: categories.count,
      breakdown: breakdowns.count,
      place: places.count,
      record: records.count
    }
  end

  def dashboard_years
    this_year = Time.zone.today.year
    return [this_year] if monthly_balance_tables.blank?

    [*(monthly_balance_tables.minimum(:year)..this_year)].reverse
  end
end
