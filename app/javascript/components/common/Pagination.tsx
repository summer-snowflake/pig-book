import React, { Component } from 'react'

interface Props {
  currentPage: number;
  maxPage: number;
  onClickPage: (page: number) => void;
}

class Pagination extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickPage = this.handleClickPage.bind(this)
  }

  handleClickPage(e: React.MouseEvent<HTMLLIElement, MouseEvent>): void {
    e.preventDefault()
    this.props.onClickPage(Number(e.currentTarget.dataset.page))
  }

  render(): JSX.Element {
    return (
      <nav className='pagination-component'>
        <ul className='pagination'>
          {this.props.currentPage !== 1 && (
            <li className='page-item'
              data-page={this.props.currentPage - 1}
              onClick={this.handleClickPage}
            >
              <a className='page-link' href='/list'>
                <i className='fas fa-chevron-left' />
              </a>
            </li>
          )}
          {Array.from(new Array(this.props.maxPage)).map((v,i)=> i + 1).map((page) => (
            <li
              className={'page-item' + (this.props.currentPage === page ? ' active' : '')}
              data-page={page}
              key={page}
              onClick={this.handleClickPage}
            >
              <a className='page-link' href='/list'>{page}</a>
            </li>
          ))}
          {this.props.currentPage !== this.props.maxPage && (
            <li className='page-item'
              data-page={this.props.currentPage + 1}
              onClick={this.handleClickPage}
            >
              <a className='page-link' href='/list'>
                <i className='fas fa-chevron-right' />
              </a>
            </li>
          )}
        </ul>
      </nav>
    )
  }
}

export default Pagination
