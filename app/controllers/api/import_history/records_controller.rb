# frozen_string_literal: true

class Api::ImportHistory::RecordsController < Api::BaseController
  before_action :set_creator, only: %i[create]

  def create
    if @creator.create_record
      head :created
    else
      render_validation_error @creator
    end
  end

  private

  def set_creator
    @creator = ImportHistory::Creator.new(
      user: current_user,
      import_history_id: params[:import_history_id]
    )
  end
end
