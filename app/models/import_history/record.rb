# frozen_string_literal: true

class ImportHistory::Record
  include ActiveModel::Model

  attr_reader :date, :category_name, :breakdown_name, :place_name,
              :charge, :memo, :tags

  validates :date,
            presence: true,
            format: { with: /(19|20)\d{2}-(0|1)\d-(((0|1|2)\d)|30|31)/,
                      allow_blank: true }
  validates :category_name, presence: true
  validates :charge,
            presence: true,
            numericality: { greater_than_or_equal_to: 0, allow_nil: true }
  validates :memo, length: { maximum: 250 }
  validate :category_should_have_existed
  validate :breakdown_should_have_existed
  validate :place_should_have_existed
  validate :tags_should_have_existed

  def initialize(user:, row:)
    @user = user
    @date = row[0]
    @category_name = row[1]
    @breakdown_name = row[2]
    @place_name = row[3]
    @charge = row[4]
    @memo = row[5]
    @tags = row[6..-1]
  end

  private

  def category_should_have_existed
    return unless category_name.present?
    return if @user.categories.find_by(name: category_name)

    errors.add(:category_name, :unregistered)
  end

  def breakdown_should_have_existed
    return unless breakdown_name.present?
    return if @user.breakdowns.find_by(name: breakdown_name)

    errors.add(:breakdown_name, :unregistered)
  end

  def place_should_have_existed
    return unless place_name.present?
    return if @user.places.find_by(name: place_name)

    errors.add(:place_name, :unregistered)
  end

  def tags_should_have_existed
    return unless tags.present?
    return if @user.tags.find_by(name: tags.split(','))

    errors.add(:tags, :unregistered)
  end
end
