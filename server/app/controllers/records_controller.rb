# frozen_string_literal: true

class RecordsController < BaseController
  def index
    fetcher = Record::Fetcher.new(user: current_user)
    fetcher.find_all_by(records_params)
    render json: { list: fetcher.records,
                   total_count: fetcher.total_count,
                   max_page: fetcher.max_page,
                   totals: fetcher.totals },
           include: %i[category breakdown place],
           methods: %i[human_charge rounded_charge], status: :ok
  end

  def create
    record = current_user.records.new(record_params)
    if record.save
      render json: record, status: :created
    else
      render_validation_error record
    end
  end

  def update
    record = current_user.records.find(params[:id])
    if record.update(record_params)
      render json: record, status: :ok
    else
      render_validation_error record
    end
  end

  def destroy
    record = current_user.records.find(params[:id])
    record.destroy!
  end

  private

  def record_params
    params.permit(:published_at, :category_id, :breakdown_id, :place_id,
                  :currency, :charge, :cashless_charge, :point, :memo)
  end

  def records_params
    params.permit(:date, :year, :month, :category_id, :breakdown_id, :place_id,
                  :limit, :order, :page)
  end
end
