# frozen_string_literal: true

module FeatureSpecHelper
  def sign_in(user)
    user.confirmed_at = Time.zone.now
    user.save
    login_as(user, scope: :user)
    visit mypage_path
  end

  def trigger_click(locator = nil, **options)
    trigger(:click, locator, options)
  end

  def add_category(balance_of_payments: false, name:)
    visit categories_path
    choose I18n.t('label.income') if balance_of_payments
    fill_in 'category_name', with: name
    trigger_click('#add-button')
  end

  def add_record(category_name: 'カテゴリ名', breakdown_name: '内訳',
                 place_name: 'お店・施設', charge: 108, memo: 'めも')
    visit new_record_path

    within '.new-record-form-component' do
      select category_name, from: 'selectable-categories'
      select breakdown_name, from: 'selectable-breakdowns'
      select place_name, from: 'selectable-places'
      fill_in 'record_charge', with: charge
      fill_in 'record_memo', with: memo
      click_on 'button.create'
    end
  end

  private

  def trigger(action, locator = nil, **options)
    elem =
      locator.is_a?(Capybara::Node::Element) ? locator : find(locator, options)
    trigger_on_xpath(action, elem.path)
  end

  def trigger_on_xpath(action, xpath)
    execute_script <<~EXEC
      var resultSet = document.evaluate('#{xpath}', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
      var elem = resultSet.iterateNext()
      elem.#{action}()
    EXEC
  end
end
