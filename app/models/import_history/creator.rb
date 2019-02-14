# frozen_string_literal: true

class ImportHistory::Creator
  include ActiveModel::Model
  include ValidationErrorMessagesBuilder

  attr_reader :record

  def initialize(user:, import_history_id:)
    @user = user
    @import_history = @user.import_histories.find(import_history_id)
  end

  def create_record
    create_record_and_update_history(@import_history)
  end

  def create_category
    return unless @import_history.category_required?

    @user.categories.create(name: @import_history.category_name)
  end

  def create_breakdown
    return unless @import_history.breakdown_required?

    category = @user.categories.find(@import_history.category_id)
    category.breakdowns.create(name: @import_history.breakdown_name,
                               category_id: @import_history.category_id)
  end

  def create_place
    return unless @import_history.place_required?

    ActiveRecord::Base.transaction do
      category = @user.categories.find(@import_history.category_id)
      place = @user.places.create(name: @import_history.place_name)
      category.categorized_places.find_by(place: place) ||
        category.categorized_places.create(place: place)
    end
  end

  def create_tags
    return unless @import_history.tags_required?

    @import_history.tags.each do |tag|
      @user.tags.find_by(name: tag) ||
        @user.tags.create(name: tag, color_code: generate_color_code)
    end
  end

  private

  def generate_color_code
    color_code = '#' + format('%06x', (rand * 0xffffff))
    return color_code if @user.tags.find_by(color_code: color_code).nil?

    generate_color_code
  end

  def check_import_history(import_history)
    errors.add(:record, :registered) && return if import_history.registered?
    record_validator = ImportHistory::RecordValidator.new(
      user: @user, row: import_history.row.split(',')
    )
    if record_validator.invalid?
      record_validator.errors.each do |key, msg|
        errors.add(key, msg)
      end
    end
    record_validator
  end

  def create_record_and_update_history(import_history)
    record_validator = check_import_history(import_history)
    return false if errors.messages.present?

    record = @user.records.new(record_validator.params)
    @import_history.update!(record_id: record.id) if record.save
    true
  rescue StandardError => e
    errors.add(:record, e.message)
    false
  end
end
