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
