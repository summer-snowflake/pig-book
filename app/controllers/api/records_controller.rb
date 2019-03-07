# frozen_string_literal: true

class Api::RecordsController < Api::BaseController
  before_action :set_record, only: %i[show update destroy]

  def index
    fetcher = Record::Fetcher.new(user: current_user)
    fetcher.find_all_by(records_params)
    render json: {
      records: to_serializers(fetcher.records),
      totals: to_serializers(fetcher.totals)
    }
  end

  def show
    render json: @record
  end

  def create
    @record = current_user.records.new(record_params)
    if @record.save
      render json: @record, status: :created
    else
      render_validation_error @record
    end
  end

  def update
    if @record.update_attributes(record_params)
      render json: @record, status: :ok
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

  def upload
    fetcher = Record::Fetcher.new(user: current_user)
    fetcher.find_all_by(records_params)
    fetcher.generate_csv_file
  end

  private

  def record_params
    params.permit(:id, :published_at, :category_id, :breakdown_id, :place_id,
                  :tags, :currency, :charge, :point, :memo)
  end

  def records_params
    params.permit(:date, :year, :month, :category_id, :breakdown_id, :place_id,
                  :limit, :order)
  end

  def set_record
    @record = current_user.records.find(params[:id])
  end
end
