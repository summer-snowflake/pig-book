# frozen_string_literal: true

class Locales::TranslationController < ApplicationController
  def ja
    render json: I18n.t('front')
  end

  def en
    I18n.locale = :en
    render json: I18n.t('front')
  end
end
