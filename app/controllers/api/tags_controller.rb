# frozen_string_literal: true

class Api::TagsController < Api::BaseController
  before_action :set_tag, only: %i[destroy]

  def index
    @tags = current_user.tags.order(created_at: :desc)
    render json: @tags
  end

  def create
    @tag = current_user.tags.new(tag_params)
    if @tag.save
      head :created
    else
      render_validation_error @tag
    end
  end

  def destroy
    @tag.destroy
    if @tag.destroyed?
      head :no_content
    else
      render_not_found_error
    end
  end

  private

  def set_tag
    @tag = current_user.tags.find(params[:id])
  end

  def tag_params
    params.permit(:name, :color_code)
  end
end
