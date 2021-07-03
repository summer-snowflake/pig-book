import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { TutorialStore } from 'types/store'
import CheckMark from 'components/mypage/CheckMark'

interface ParentProps {
  tutorialStore: TutorialStore;
}

type Props = ParentProps & I18nProps

class TutorialCardBody extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='card-body with-background-image'>
        <table className='table'>
          <tbody>
            <tr>
              <td>
                <CheckMark check={this.props.tutorialStore.categoryExists} />
              </td>
              <td className='tutorial-link'>
                <NavLink to='/categories'>
                  <i className='fas fa-cog left-icon' />
                  {t('menu.settings')} {'>'} {t('menu.category')}
                </NavLink>
              </td>
              <td>
                {t('label.tutorial-category')}
              </td>
            </tr>
            <tr>
              <td>
                <CheckMark check={this.props.tutorialStore.placeExists} />
              </td>
              <td className='tutorial-link'>
                <NavLink to='/places'>
                  <i className='fas fa-cog left-icon' />
                  {t('menu.settings')} {'>'} {t('menu.place')}
                </NavLink>
              </td>
              <td>
                {t('label.tutorial-place')}
              </td>
            </tr>
            <tr>
              <td>
                <CheckMark check={this.props.tutorialStore.recordExists} />
              </td>
              <td className='tutorial-link'>
                <NavLink to='/input'>
                  <i className='fas fa-palette left-icon' />
                  {t('menu.input')}
                </NavLink>
              </td>
              <td>
                {t('label.tutorial-record')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default withTranslation()(TutorialCardBody)
