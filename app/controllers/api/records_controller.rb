# frozen_string_literal: true

class Api::RecordsController < Api::BaseController
  def create
    @record = current_user.records.new(record_params)
    if @record.save
      head :created
    else
      render_validation_error @record
    end
  end

  private

  def record_params
    params.permit(:published_on, :category_id, :breakdown_id, :place_id, :charge, :memo)
  end
end
