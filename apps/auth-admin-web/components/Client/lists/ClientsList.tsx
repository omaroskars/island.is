/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import Paginator from '../../common/Paginator'
import Link from 'next/link'
import { ClientService } from '../../../services/ClientService'
import ConfirmModal from '../../common/ConfirmModal'
import { Client } from './../../../entities/models/client.model'

class ClientsList extends Component {
  state = {
    clients: [],
    rowCount: 0,
    count: 1,
    page: 1,
    modalIsOpen: false,
    clientToRemove: '',
  }

  getClients = async (page: number, count: number): Promise<void> => {
    const response = await ClientService.findAndCountAll(page, count)
    if (response) {
      const clientsArr = response.rows.sort((c1, c2) => {
        if (!c1.archived && !c2.archived) return 0
        if (!c1.archived && c2.archived) return 1
        if (c1.archived && !c2.archived) return -1
        return 0
      })

      this.setState({
        clients: clientsArr.reverse(),
        rowCount: response.count,
      })
    }
  }

  handlePageChange = async (page: number, count: number): Promise<void> => {
    this.getClients(page, count)
    this.setState({ page: page, count: count })
  }

  archive = async (): Promise<void> => {
    await ClientService.delete(this.state.clientToRemove)
    this.getClients(this.state.page, this.state.count)

    this.closeModal()
  }

  confirmArchive = async (clientId: string): Promise<void> => {
    this.setState({ clientToRemove: clientId })

    this.setState({ modalIsOpen: true })
  }

  closeModal = (): void => {
    this.setState({ modalIsOpen: false })
  }

  setHeaderElement = (): JSX.Element => {
    return (
      <p>
        Are you sure want to archive this client:{' '}
        <span>{this.state.clientToRemove}</span>
      </p>
    )
  }

  render(): JSX.Element {
    return (
      <div>
        <div className="clients">
          <div className="clients__wrapper">
            <div className="clients__container">
              <h1>Clients</h1>
              <div className="clients__container__options">
                <div className="clients__container__button">
                  <Link href={'/client'}>
                    <a className="clients__button__new">
                      <i className="icon__new"></i>Create new client
                    </a>
                  </Link>
                </div>
              </div>
              <div className="client__container__table">
                <table className="clients__table">
                  <thead>
                    <tr>
                      <th>Client Id</th>
                      <th>Description</th>
                      <th>Type</th>
                      <th colSpan={2}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.clients.map((client: Client) => {
                      return (
                        <tr
                          key={client.clientId}
                          className={client.archived ? 'archived' : ''}
                        >
                          <td>{client.clientId}</td>
                          <td>{client.description}</td>
                          <td>{client.clientType}</td>
                          <td className="clients__table__button">
                            <Link
                              href={`client/${encodeURIComponent(
                                client.clientId,
                              )}`}
                            >
                              <button
                                type="button"
                                className={`clients__button__edit${
                                  client.archived ? ' hidden' : ''
                                }`}
                                title="Edit"
                              >
                                <i className="icon__edit"></i>
                                <span>Edit</span>
                              </button>
                            </Link>
                          </td>
                          <td className="clients__table__button">
                            <button
                              type="button"
                              className={`clients__button__delete${
                                client.archived ? ' hidden' : ''
                              }`}
                              title="Delete"
                              onClick={() =>
                                this.confirmArchive(client.clientId)
                              }
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
                lastPage={Math.ceil(this.state.rowCount / this.state.count)}
                handlePageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
        <ConfirmModal
          modalIsOpen={this.state.modalIsOpen}
          headerElement={this.setHeaderElement()}
          closeModal={this.closeModal}
          confirmation={this.archive}
          confirmationText="Archive"
        ></ConfirmModal>
      </div>
    )
  }
}

export default ClientsList
