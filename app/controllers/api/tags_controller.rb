# frozen_string_literal: true

module Api
  class TagsController < Api::BaseController
    def index
      tags = current_user.tags.order(created_at: :desc)
      render json: tags, status: :ok
    end

    def create
      tag = current_user.tags.new(tag_params)
      if tag.save
        render json: tag, status: :created
      else
        render_validation_error tag
      end
    end

    def update
      tag = current_user.tags.find(params[:id])
      if tag.update(tag_params)
        render json: tag, status: :ok
      else
        render_validation_error tag
      end
    end

    def destroy
      tag = current_user.tags.find(params[:id])
      tag.destroy!
    rescue ActiveRecord::RecordNotDestroyed
      render json: { errors: [I18n.t('errors.cannot_be_deleted')] },
             status: :forbidden
    end

    private

    def tag_params
      params.permit(:name, :color_code)
    end
  end
end
