/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Paginator from '../../common/Paginator'
import Link from 'next/link'

interface Props {
  list: any
  header: string
  linkHeader: string
  createUri: string
  lastPage: number
  handlePageChange: (page: number, count: number) => void
  edit: (object: any) => void
  remove: (name: string) => void
}

const ResourceListDisplay: React.FC<Props> = ({
  list,
  header,
  linkHeader,
  createUri,
  lastPage,
  handlePageChange,
  edit,
  remove,
}) => {
  return (
    <div>
      <div className="identity-resources">
        <div className="identity-resources__wrapper">
          <div className="identity-resources__container">
            <h1>{header}</h1>
            <div className="identity-resources__container__options">
              <div className="identity-resources__container__button">
                {/* Change href link */}
                <Link href={createUri}>
                  <a className="identity-resources__button__new">
                    <i className="icon__new"></i>
                    {linkHeader}
                  </a>
                </Link>
              </div>
            </div>
            <div className="client__container__table">
              <table className="identity-resources__table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Display Name</th>
                    <th colSpan={2}></th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((resource: any) => {
                    return (
                      <tr
                        key={resource.name}
                        className={resource.archived ? 'archived' : ''}
                      >
                        <td>{resource.name}</td>
                        <td>{resource.displayName}</td>
                        <td className="identity-resources__table__button">
                          <button
                            type="button"
                            className={`identity-resources__button__edit${
                              resource.archived ? ' hidden' : ''
                            }`}
                            onClick={() => edit(resource)}
                            title="Edit"
                          >
                            <i className="icon__edit"></i>
                            <span>Edit</span>
                          </button>
                        </td>
                        <td className="identity-resources__table__button">
                          <button
                            type="button"
                            className={`identity-resources__button__delete${
                              resource.archived ? ' hidden' : ''
                            }`}
                            onClick={() => remove(resource.name)}
                            title="Delete"
                          >
                            <i className="icon__delete"></i>
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <Paginator
              lastPage={lastPage}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourceListDisplay
