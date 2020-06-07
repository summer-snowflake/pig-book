# frozen_string_literal: true

class RecordsController < BaseController
  before_action :set_record, only: %i[update destroy]

  def index
    fetcher = Record::Fetcher.new(user: current_user)
    fetcher.find_all_by(records_params)
    render json: { list: fetcher.records,
                   total_count: fetcher.total_count,
                   max_page: fetcher.max_page,
                   totals: fetcher.totals },
           include: %i[category breakdown place tags],
           methods: %i[human_charge rounded_charge], status: :ok
  end

  def create
    record = current_user.records.new(record_params)
    if record.save
      if tags_params[:tags]
        tags = tags_params[:tags].pluck(:id).map { |tag| { tag_id: tag } }
        record.tagged_records.create(tags)
      end
      render json: record, status: :created
    else
      render_validation_error record
    end
  end

  def update
    if @record.update(record_params)
      if tags_params[:tags]
        tags = tags_params[:tags].pluck(:id).map { |tag| { tag_id: tag } }
        @record.tagged_records.destroy_all
        @record.tagged_records.create(tags)
      end
      render json: @record, status: :ok
    else
      render_validation_error @record
    end
  end

  def destroy
    @record.destroy!
  end

  private

  def set_record
    @record = current_user.records.find(params[:id])
  end

  def record_params
    params.permit(:published_at, :category_id, :breakdown_id, :place_id,
                  :currency, :charge, :cashless_charge, :point, :memo)
  end

  def tags_params
    params.permit(tags: [:id])
  end

  def records_params
    params.permit(:date, :year, :month, :category_id, :breakdown_id, :place_id, :tag_ids,
                  :limit, :order, :page)
  end
end
