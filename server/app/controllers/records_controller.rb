# frozen_string_literal: true

class RecordsController < ApplicationController
  before_action :authenticate_user!

  def index
    fetcher = Record::Fetcher.new(user: current_user)
    fetcher.find_all_by(records_params)
    records = fetcher.records.includes(
      :category, :place, :breakdown
    )
    render json: records, status: :ok
  end

  private

  def records_params
    params.permit(:date, :year, :month, :category_id, :breakdown_id, :place_id,
                  :limit, :order)
  end
end
