# frozen_string_literal: true

class Api::RecordsController < Api::BaseController
  before_action :set_record, only: %i[destroy]

  def index
    fetcher = Record::Fetcher.new(user: current_user)
    @records = fetcher.find_all_by(keyword_params)
    render json: @records
  end

  def create
    @record = current_user.records.new(record_params)
    if @record.save
      head :created
    else
      render_validation_error @record
    end
  end

  def destroy
    @record.destroy
    if @record.destroyed?
      head :no_content
    else
      render_not_found_error
    end
  end

  private

  def record_params
    params.permit(:published_on, :category_id, :breakdown_id, :place_id,
                  :charge, :memo)
  end

  def keyword_params
    params.permit(:y, :m, :d)
  end

  def set_record
    @record = current_user.records.find(params[:id])
  end
end
