# frozen_string_literal: true

class User < ApplicationRecord
  include DeviseTokenAuth::Concerns::User
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable, :lockable, :timeoutable, :omniauthable

  include TimeFormats

  RECENTLY_RECORDS_LIMIT_COUNT = 20

  has_many :categories, dependent: :destroy
  has_many :places, dependent: :destroy
  has_many :breakdowns, through: :categories
  has_many :templates, through: :categories
  has_many :tags, dependent: :destroy
  has_many :records, dependent: :destroy
  has_many :yearly_all_balance_tables, dependent: :destroy
  has_many :yearly_category_balance_tables, dependent: :destroy
  has_many :yearly_breakdown_balance_tables, dependent: :destroy
  has_many :monthly_balance_tables, dependent: :destroy
  has_many :events, dependent: :destroy
  has_many :import_histories, dependent: :destroy
  has_many :download_files, -> { order(created_at: :desc) }, dependent: :destroy
  has_one :admin, dependent: :destroy
  has_one :profile, dependent: :destroy

  validates :authentication_token, uniqueness: true, allow_nil: true

  def admin?
    admin.present?
  end

  def ensure_authentication_token
    authentication_token || generate_authentication_token
  end

  def base_setting
    profile || Profile.create!(user: self)
  end

  def current_currency
    base_setting.currency
  end

  def last_tally_at
    events.tally_monthly.last&.created_at
  end

  def recently_records
    records.order(created_at: :desc).limit(RECENTLY_RECORDS_LIMIT_COUNT)
  end

  def present_years
    monthly_balance_tables.where(currency: base_setting.currency).target_years
  end

  private

  def generate_authentication_token
    token = SecureRandom.urlsafe_base64(24)
    update!(authentication_token: token)
  rescue StandardError
    generate_authentication_token
  end
end
