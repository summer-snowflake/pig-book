# frozen_string_literal: true

class TaggedRecordsController < BaseController
  before_action :find_record, only: %i[index]

  def index
    render json: @record.tagged_records.to_json(include: :tag), status: :ok
  end

  private

  def find_record
    @record = current_user.records.find(params[:record_id])
  end
end
