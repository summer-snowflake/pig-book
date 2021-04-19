# frozen_string_literal: true

module Api
  class DashboardsController < BaseController
    def index
      fetcher = Dashboard::Fetcher.new(user: current_user)
      render json: fetcher.all
    end

    def show
      fetcher = Dashboard::Fetcher.new(user: current_user)
      render json: fetcher.find_by(year: params[:year].to_i)
    end

    def update
      event = current_user.tally_events.create(year: params[:year])
      monthly_updater = MonthlyBalanceTable::Updater.new(user: current_user)
      monthly_updater.update(year: params[:year].to_i)
      yearly_updater = YearlyBalanceTable::Updater.new(user: current_user)
      yearly_updater.update(year: params[:year].to_i)

      render json: {
        event: event
      }
    end
  end
end
